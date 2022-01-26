import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, BOOKS_BY_GENRE } from "../queries"

const NewBook = props => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [published, setPublished] = useState("")
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      // {query:ALL_BOOKS} // 8.22 requirement: When new genre selection is not done, the view does not have to be updated.
      { query: BOOKS_BY_GENRE },
    ], // to update cache (2/n): use mutaition hook's refetchQueries parameter. fetch again after everytime new book created. pros: save web traffic, cons: can't see other's update immediately.
  })

  if (!props.show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()

    const result = createBook({
      variables: { title, published: Number(published), author, genres },
    })

    if (result.loading) {
      console.log("add book...")
    } else {
      console.log(result)
    }

    setTitle("")
    setPublished("")
    setAuthor("")
    setGenres([])
    setGenre("")
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre("")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
