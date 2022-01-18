import React from "react"

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} {blog.likes === 1 ? "like" : "likes"}
      </div>
      <div>added by {blog.userId ? blog.userId.name : "Anonymous"}</div>
    </div>
  )
}

export default Blog
