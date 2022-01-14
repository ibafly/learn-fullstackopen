import React from "react"
import Input from "./Input"
import { useHistory } from "react-router-dom"
import { useField } from "../hooks"

const AnecdoteForm = props => {
  const content = useField("text")
  const author = useField("text")
  const info = useField("url")
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })

    history.push("/")
  }

  const handleClick = e => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <Input name="content" {...content} />
        </div>
        <div>
          author
          <Input name="author" {...author} />
        </div>
        <div>
          url for more info
          <Input name="info" {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleClick}>
          reset
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm
