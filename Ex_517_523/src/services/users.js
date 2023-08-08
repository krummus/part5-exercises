import axios from 'axios'
const baseUrl = '/api/users/'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getOne = (id) => {
    const request = axios.get(baseUrl + `/${id}`)
    return request.then(response => response.data)
}

const createOne = (newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

const updateOne = (id, updatedObject) => {
    const request = axios.put(baseUrl + `/${id}`, updatedObject)
    return request.then(response => response.data)
}

const deleteOne = (id) => {
    const request = axios.delete(baseUrl + `/${id}`)
    return request.then(response => response.data)
}

const ObjectsToExport = { getAll, getOne, createOne, updateOne, deleteOne, setToken }

export default ObjectsToExport
