import React from "react"
import { useField } from "../hooks"

import { Input, Button } from "@mui/material"

const CommentForm = ({ blog, opAfterSubmit }) => {
  const comment = useField("text")
  const { reset, ...commentProps } = comment

  const formOnSubmit = event => {
    event.preventDefault()
    opAfterSubmit(blog.id, comment.value)
    //    comment.reset()
    reset()
  }

  return (
    <form onSubmit={formOnSubmit}>
      <Input {...commentProps} />
      {/* <button type="submit">add comment</button> */}
      <Button variant="outlined" type="submit">
        add comment
      </Button>
    </form>
  )
}

export default CommentForm
