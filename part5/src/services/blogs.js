import axios from "axios"
const baseUrl = "/api/blogs"

let tokenAuth = null // token is used when create/update/delete blogs, so token resides here in blogService as a private variable. and setToken method is exported to set token after login operation (get token)

const setToken = newToken => {
  tokenAuth = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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

export default { getAll, create, setToken }
