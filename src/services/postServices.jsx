export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_embed=likedPosts`).then((res) => res.json())
}
