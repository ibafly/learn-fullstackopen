import React, { useState } from "react"

const Blog = ({ blog, btnOnClick, toggle, dataIndex }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid 1px black",
    marginBottom: 5,
  }
  return (
    <div data-index={dataIndex} style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={btnOnClick}>{toggle ? "hide" : "view"}</button>
      {toggle && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}
            <button>like</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
