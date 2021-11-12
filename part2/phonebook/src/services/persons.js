import axios from "axios"

const getAll = () =>
  axios.get("http://localhost:3001/persons").then(res => res.data)

const create = newObj =>
  axios.post("http://localhost:3001/persons", newObj).then(res => res.data)

// can't use delete as variabale for it's a reserved word in js
const remove = id =>
  axios.delete("http://localhost:3001/persons/" + id).then(res => res.data)

export default { getAll, create, remove } // = { getAll: getAll, create: create ,remove: remove } i got no-anonymous-default-export warning
