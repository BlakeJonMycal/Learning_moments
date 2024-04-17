export const getAllLikes = () => {
    return fetch(`http://localhost:8088/LikedPosts`).then((res) => res.json())
}