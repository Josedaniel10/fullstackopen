import axios from 'axios'
const API_URL = '/api/persons';

const getAllPersons = () => {
    const req = axios.get(API_URL);
    return req.then(res => res.data)
}

const postPerson = (data) => {
    const req = axios.post(API_URL, data);
    return req.then(res => res.data);
}

const updatePerson = (id, data) => {
    const req = axios.put(`${API_URL}/${id}`, data);
    return req.then(res => res.data)
}

const deletePerson = (id) => {
    return axios.delete(`${API_URL}/${id}`);
}

export default { getAllPersons, postPerson, deletePerson, updatePerson }