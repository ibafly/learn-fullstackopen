import React from "react"
import { Link } from "react-router-dom"

const UserStatsTable = ({ docs }) => {
  const reducer = (result, doc) => {
    if (!doc.userId || doc.userId.name === undefined) {
      // not count blogs with anonymous or undefined users
      return result
    }

    if (!Object.keys(result).includes(doc.userId.id)) {
      result[doc.userId.id] = { name: doc.userId.name, created: 1 }
      return result
    }
    result[doc.userId.id].created += 1
    return result
  }
  const userStatsObj = docs.reduce(reducer, {})

  let users = []
  for (const id in userStatsObj) {
    users.push({ id, ...userStatsObj[id] })
  }

  //  console.log(docs, users)

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.name}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.created}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserStatsTable
