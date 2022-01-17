import React from "react"
//import { Route, Link } from "react-router-dom"

const UserCreatedBlogList = ({ user, blogs }) => {
  if (!user) {
    // use conditional rendering to avoid `user is null` error in browser console when user prop waits async operation finishs
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserCreatedBlogList
