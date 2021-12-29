import React, { useState } from "react"

const Blog = ({
  blog,
  toggleBtnOnClick,
  toggle,
  dataIndex,
  opAfterLikeBtnOnClick,
}) => {
  const likeBtnOnClick = event => {
    const idx =
      event.target.parentNode.parentNode.parentNode.getAttribute("data-index")
    opAfterLikeBtnOnClick(idx)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid 1px black",
    marginBottom: 5,
  }
  return (
    <div data-index={dataIndex} style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleBtnOnClick}>{toggle ? "hide" : "view"}</button>
      {toggle && (
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
