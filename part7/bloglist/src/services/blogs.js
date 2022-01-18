import axios from "axios"
const baseUrl = "/api/blogs"

let tokenAuth = null // token is used when create/update/delete blogs, so token resides here in blogService as a private variable. and setToken method is exported to set token after login operation (get token)

const setToken = newToken => {
  tokenAuth = `bearer ${newToken}`
}
const getAll = () => {
  const config = {
    headers: {
      Authorization: tokenAuth,
    },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const getOne = async id => {
  // one blog with comments expanded
  const config = {
    headers: {
      Authorization: tokenAuth,
    },
  }

  const res = await axios.get(`${baseUrl}/${id}`, config)
  return res.data
}

const create = async newObj => {
  // const token = JSON.parse(window.localStorage.getItem("loggedUser")).token // item loggedUser already parsed once in useEffect
  // const authorization = `bearer ` + token // extracted to setToken
  const config = {
    headers: {
      Authorization: tokenAuth,
    },
  }
  const res = await axios.post(baseUrl, newObj, config)
  return res.data
}

const update = async (id, newObj) => {
  const config = {
    headers: {
      Authorization: tokenAuth,
    },
  }
  const res = await axios.put(`${baseUrl}/${id}`, newObj, config)
  return res.data
}

const remove = async id => {
  const config = {
    headers: {
      Authorization: tokenAuth,
    },
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const createComment = async (id, newObj) => {
  const config = {
    headers: {
      Authorization: tokenAuth,
    },
  }

  const res = await axios.post(`${baseUrl}/${id}/comments`, newObj, config)
  return res.data
}

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  createComment,
  setToken,
}
