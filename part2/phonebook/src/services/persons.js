import axios from "axios"

const baseUrl = "/api/persons"

const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = newObj => axios.post(baseUrl, newObj).then(res => res.data)

// can't use delete as variabale for it's a reserved word in js
const remove = id => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

const update = (id, newObj) =>
  axios.put(`${baseUrl}/${id}`, newObj).then(res => res.data)

export default { getAll, create, remove, update } // = { getAll: getAll, create: create ,remove: remove } i got no-anonymous-default-export warning
