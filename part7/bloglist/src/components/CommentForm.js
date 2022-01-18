import React from "react"
import { useField } from "../hooks"
import Input from "./Input"

const CommentForm = ({ blog, opAfterSubmit }) => {
  const comment = useField("text")

  const formOnSubmit = event => {
    event.preventDefault()
    opAfterSubmit(blog.id, comment.value)
    comment.reset()
  }

  return (
    <form onSubmit={formOnSubmit}>
      <Input {...comment} />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
