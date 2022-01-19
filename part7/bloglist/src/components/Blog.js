import React, { useEffect } from "react"

import { List, ListItem, ListItemText, Box, Button, Link } from "@mui/material"

const Blog = ({ blog, opInUseEffect, opAfterLikeBtnOnClick, children }) => {
  if (!blog) {
    return null
  }

  const likeBtnOnClick = () => {
    opAfterLikeBtnOnClick(blog.id)
  }

  useEffect(() => {
    opInUseEffect(blog.id)
  }, [])

  console.log(blog)
  return (
    <div>
      <h2>{blog.title}</h2>
      {/* <a href={blog.url}>{blog.url}</a> */}
      <Link variant="h4" underline="always" href={blog.url}>
        {blog.url}
      </Link>
      <div>
        <Box component="span" sx={{ typography: "body1" }}>
          {blog.likes} {blog.likes === 1 ? "like" : "likes"}&nbsp;
        </Box>
        <Button
          size="small"
          variant="contained"
          className="likes"
          onClick={likeBtnOnClick}
        >
          like
        </Button>
      </div>
      {/* <div>added by {blog.userId ? blog.userId.name : "Anonymous"}</div> */}
      <Box sx={{ typography: "subtitle2" }}>
        added by {blog.userId ? blog.userId.name : "Anonymous"}
      </Box>

      <h3>comments</h3>
      {children}
      {/* <ul>
        {blog.comments &&
          blog.comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>

          ))}
      </ul> */}

      <List>
        {blog.comments &&
          blog.comments.map(comment => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.content} />
            </ListItem>
          ))}
      </List>
    </div>
  )
}

export default Blog
