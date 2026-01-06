import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (data, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  const res = await axios.post(baseUrl, data, config)
  return res.data
}

const update = async (id, data, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  const res = await axios.put(`${baseUrl}/${id}`, data, config)
  return res.data
}

const remove = async (id, user) => {
  const config = {
    headers: { Authorization: `Bearer ${user.token}` }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, remove }