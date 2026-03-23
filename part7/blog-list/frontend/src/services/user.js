import axios from "axios";

const URL_USER = '/api/users'

export const getUsers = async () => {
    const res = await axios.get(URL_USER)
    return res.data
}
