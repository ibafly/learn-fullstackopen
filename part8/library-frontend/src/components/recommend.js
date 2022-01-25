import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { ME } from "../queries"

const Recommend = ({ show, allBooks }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const result = useQuery(ME)
  useEffect(() => {
    console.log(result.data)
    if (result.data) {
      setCurrentUser(result.data.me)
    }
  }, [result.data])

  if (!show) {
    return null
  }
  if (result.loading || !currentUser) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre{" "}
        <strong>{currentUser.favoriteGenre}</strong>
      </div>
      <table style={{ paddingBottom: 20 }}>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks
            .filter(book => book.genres.includes(currentUser.favoriteGenre))
            .map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
