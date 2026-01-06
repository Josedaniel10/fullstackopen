import axios from 'axios'

const URL_LOGIN = '/api/login'

const sendLoginRequest = async credentials => {
  const res = await axios.post(URL_LOGIN, credentials)
  return res.data
}

export default {
  sendLoginRequest
}