import React, { useEffect } from "react"

const Blog = ({ blog, opInUseEffect }) => {
  if (!blog) {
    return null
  }

  useEffect(() => {
    opInUseEffect(blog.id)
  }, [])

  console.log(blog)
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} {blog.likes === 1 ? "like" : "likes"}
      </div>
      <div>added by {blog.userId ? blog.userId.name : "Anonymous"}</div>

      <h3>comments</h3>
      <ul>
        {blog.comments &&
          blog.comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>
    </div>
  )
}

export default Blog
