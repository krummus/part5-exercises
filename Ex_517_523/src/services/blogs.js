import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getOne = (id) => {
    const request = axios.get(baseUrl + `/${id}`)
    return request.then(response => response.data)
}

const createOne = (newObject, token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` },
    }
    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

const updateOne = (id, updatedObject) => {
    const request = axios.put(baseUrl + `/${id}`, updatedObject)
    return request.then(response => response.data)
}

const deleteOne = (id, token) => {
    const config = {
        headers: { Authorization: `bearer ${token}` },
    }
    const request = axios.delete(baseUrl + `/${id}`, config)
    return request.then(response => response.data)
}

const ObjectsToExport = { getAll, getOne, createOne, updateOne, deleteOne }

export default ObjectsToExport

