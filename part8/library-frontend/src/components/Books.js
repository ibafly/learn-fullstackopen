import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = props => {
  const [selectedGenre, setSelectedGenre] = useState("all genres")
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 8000, // to update cache (1/n): poll server every 2 seconds. pros: update other users' changes automatically, cons: cost lots web traffic.
  })
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  let genres = result.data.allBooks.reduce(
    (calculated, element) => {
      return [...calculated, ...element.genres]
    },
    ["all genres"]
  )
  genres = Array.from(new Set(genres))

  const books =
    selectedGenre === "all genres"
      ? result.data.allBooks
      : result.data.allBooks.filter(book => book.genres.includes(selectedGenre))

  return (
    <div>
      <h2>books</h2>
      {selectedGenre !== "all genres" && (
        <div>
          in genre <strong>{selectedGenre}</strong>
        </div>
      )}
      <table style={{ paddingBottom: 20 }}>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(book => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ position: "fixed", zIndex: 5, bottom: 0 }}>
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => {
              setSelectedGenre(genre)
            }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
