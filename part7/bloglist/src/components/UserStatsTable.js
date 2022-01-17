import React from "react"

const UserStatsTable = ({ docs }) => {
  const reducer = (result, doc) => {
    if (!doc.userId || doc.userId.name === undefined) {
      // not count blogs with anonymous or undefined users
      return result
    }

    if (!Object.keys(result).includes(doc.userId.name)) {
      result[doc.userId.name] = 1
      return result
    }
    result[doc.userId.name] += 1
    return result
  }
  const userStatsObj = docs.reduce(reducer, {})

  let users = []
  for (const name in userStatsObj) {
    users.push({ name, created: userStatsObj[name] })
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
            <td>{user.name}</td>
            <td>{user.created}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserStatsTable
