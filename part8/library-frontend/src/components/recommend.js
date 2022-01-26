import React, { useState, useEffect } from "react"
import { useLazyQuery, useQuery } from "@apollo/client"
import { ME } from "../queries"
import { BOOKS_BY_GENRE } from "../queries"

const Recommend = ({ show, books, currentUser, allBooks }) => {
  //   const [currentUser, setCurrentUser] = useState(null)
  //   const [books, setBooks] = useState(null)
  //   const resultOfMe = useQuery(ME)
  //   const [booksByGenre, result] = useLazyQuery(BOOKS_BY_GENRE)
  //   console.log(currentUser, books)
  //   useEffect(() => {
  //     console.log(resultOfMe.data, currentUser)

  //     if (resultOfMe.data) {
  //       setCurrentUser(resultOfMe.data.me)
  //     }
  //     if (currentUser) {
  //       booksByGenre({ variables: { genre: currentUser.favoriteGenre } })
  //     }
  //     if (result.data) {
  //       setBooks(result.data.allBooks)
  //     }
  //   }, [resultOfMe.data, result.data, currentUser]) //eslint-disable-line

  if (!show) {
    return null
  }
  //   if (result.loading || !currentUser) {
  if (!currentUser) {
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
          {/* {allBooks */}
          {books
            // .filter(book => book.genres.includes(currentUser.favoriteGenre))
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
