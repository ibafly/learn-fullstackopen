import axios from "axios"
const baseUrl = "/anecdotes"

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async content => {
  const newObj = { content, votes: 0 }
  console.log(newObj)
  const res = await axios.post(baseUrl, newObj)
  console.log(res.data)
  return res.data
}

export default { getAll, create }
