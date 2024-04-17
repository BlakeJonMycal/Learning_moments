import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/postServices.jsx";
import { getAllTopics } from "../../services/topicServices.jsx";
import { getAllLikes } from "../../services/likeServices.jsx";
import { PostFilterBar } from "./PostFilterBar.jsx";
import "./Posts.css"



export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPosts, setFilteredPosts] = useState([])
    const [likes, setLikes] = useState([])

    useEffect(() => {
        Promise.all([getAllPosts(), getAllTopics(), getAllLikes()])
            .then(([postArray, topicArray, likeArray]) => {
                setPosts(postArray)
                setTopics(topicArray)
                setFilteredPosts(postArray)
                setLikes(likeArray)
            })
    }, [])

    useEffect(() => {
        const foundPosts = posts.filter((post) => {
            const matchesTopic = selectedTopic === "" || post.topicId === parseInt(selectedTopic)
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesTopic && matchesSearch
        })
        setFilteredPosts(foundPosts)
    }, [searchTerm, selectedTopic, posts])

    const handleChange = (event) => {
        setSelectedTopic(event.target.value)
    }
    return (
        <div>
            <div className="dropdown">
                <h2>Posts</h2>
                <PostFilterBar setSearchTerm={setSearchTerm} />
                <select value={selectedTopic} onChange={handleChange}>
                    <option value="">All Topics</option>
                    {topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                            {topic.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="posts-page">
                <article className="post-container">
                    {filteredPosts.map((postObj) => {
                        const postTopic = topics.find((topicObj) => postObj.topicId === topicObj.id)
                        const postLikesArray = likes.filter((likeObj) => postObj.id === likeObj.postId)
                        return (
                            <div className="post" key={postObj.id}> <div className="post-info">{postObj.title} <div className="post-info">{postTopic.name}</div> <div className="post-info">{postLikesArray.length}</div></div>

                            </div>
                        )
                    })}



                </article>
            </div>
        </div>

    
    )
}
