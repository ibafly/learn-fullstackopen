import React, { useEffect, useState } from "react"
// import { useLazyQuery, useQuery } from "@apollo/client"
// import { ALL_BOOKS } from "../queries"

const Books = ({ show, books, btnOnClick, selectedGenre }) => {
  // useEffect(() => {
  //   useLazyQuery(ALL_BOOKS)
  // }, [selectedGenre])

  if (!show) {
    return null
  }
  if (!books) {
    return <div>loading...</div>
  }

  let genres = books.reduce(
    (calculated, element) => {
      return [...calculated, ...element.genres]
    },
    ["all genres"]
  )
  genres = Array.from(new Set(genres))

  const selectedBooks =
    selectedGenre === "all genres"
      ? books
      : books.filter(book => book.genres.includes(selectedGenre))

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
          {selectedBooks.map(book => (
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
              // setSelectedGenre(genre)
              btnOnClick(genre)
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
