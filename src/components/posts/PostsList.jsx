import { useEffect, useState } from "react";
import { getAllPosts, getAllTopics } from "../../services/postServices.jsx";
import "./Posts.css"
import { PostFilterBar } from "./PostFilterBar.jsx";

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [topics, setTopics] = useState([]) 
    const [selectedTopic, setSelectedTopic] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPosts, setFilteredPosts] = useState([])
    
    useEffect(() => {
        Promise.all([getAllPosts(), getAllTopics()])
            .then(([postArray, topicArray]) => {
                setPosts(postArray)
                setTopics(topicArray)
                setFilteredPosts(postArray)
            })
    }, [])

    useEffect(() => {
        const foundPosts = posts.filter((post) => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPosts(foundPosts)
    }, [searchTerm, posts])

    const handleChange = (event) => {
        setSelectedTopic(event.target.value)
    }
  
    const getTopicName = (topicId) => {
        const topic = topics.find(topic => topic.id === topicId)
        return topic.name
    }
   

    return(<>
        <h2>Posts</h2>
        <PostFilterBar setSearchTerm={setSearchTerm} />
        <div className="dropdown">
        <select value={selectedTopic} onChange={handleChange}>
            <option value="">All Posts / Filter By Topic</option>
            {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                    {topic.name}
                </option>
            ))}
        </select>
        </div>
        <div className="posts-container">
            
        {filteredPosts
                    .filter((post) => selectedTopic === "" || post.topicId === parseInt(selectedTopic))
                    .map((postObj) => (
                <section className="post" key={postObj.id}>
                <div className="postTitle">Title: {postObj.title}</div>
                <div className="postTopic">Topic: {getTopicName(postObj.topicId)}</div>
                <div className="postLikes">Likes: {postObj.likes}</div>
              
                </section>
            )
        
        )}


        </div>
</>

    )

}