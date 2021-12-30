import React, { useState } from "react"

const Blog = ({ blog, toggleBtnOnClick, opAfterLikeBtnOnClick }) => {
  const likeBtnOnClick = event => {
    const blogId =
      event.target.parentNode.parentNode.parentNode.getAttribute("data-id")
    opAfterLikeBtnOnClick(blogId)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid 1px black",
    marginBottom: 5,
  }
  return (
    <div data-id={blog.id} style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleBtnOnClick}>
        {blog.toggle ? "hide" : "view"}
      </button>
      {blog.toggle && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}
            <button onClick={likeBtnOnClick}>like</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
