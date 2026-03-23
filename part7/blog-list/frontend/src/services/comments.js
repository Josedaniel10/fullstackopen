import axios from "axios";
const baseUrl = '/api/blogs'

const getCommentByBlog = async (blogId) => {
    const res = await axios.get(`${baseUrl}/${blogId}/comments`)
    return res.data
}

const createComment = async (comment) => {
    const res = await axios.post(`${baseUrl}/${comment.blog}/comments`, comment)
    return res.data
}

export { getCommentByBlog, createComment }