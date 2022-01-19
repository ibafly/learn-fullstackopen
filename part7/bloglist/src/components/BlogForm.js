import React, { useState } from "react"
import { useField } from "../hooks"

import { Box, Button, TextField } from "@mui/material"

const BlogForm = ({ opAfterSubmit, cancelBtnOnClick }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  //  const [url, setUrl] = useState("")
  const { reset: resetUrl, ...url } = useField("text")

  const followTitleInput = ({ target }) => {
    setTitle(target.value)
  }
  const followAuthorInput = ({ target }) => {
    setAuthor(target.value)
  }
  // const followUrlInput = ({ target }) => {
  //   setUrl(target.value)
  // }
  const formOnSubmit = event => {
    event.preventDefault()
    opAfterSubmit({ title, author, url }) // async create blog
    setTitle("")
    setAuthor("")
    // setUrl("")
    resetUrl()
  }

  return (
    <form onSubmit={formOnSubmit}>
      {/* <div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={followTitleInput}
        />
      </div> */}
      <Box sx={{ mb: 1 }}>
        <TextField
          size="small"
          label="title"
          type="text"
          id="title"
          value={title}
          onChange={followTitleInput}
        ></TextField>
      </Box>
      {/* <div>
        <label htmlFor="author">author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={followAuthorInput}
        />
      </div> */}
      <Box sx={{ mb: 1 }}>
        <TextField
          size="small"
          label="author"
          type="text"
          id="author"
          value={author}
          onChange={followAuthorInput}
        />
      </Box>
      <Box sx={{ mb: 1 }}>
        {/* <label htmlFor="url">url:</label>
        <input type="text" id="url" value={url} onChange={followUrlInput} /> */}
        <TextField
          size="small"
          label="url"
          id="url"
          // type="text"
          // value={url}
          // onChange={followUrlInput}
          {...url}
        />
      </Box>
      <Box>
        <Button variant="outlined" type="submit">
          create
        </Button>
        <Button onClick={cancelBtnOnClick}>cancel</Button>
      </Box>
    </form>
  )
}

export default BlogForm
