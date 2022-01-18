import React from "react"
import { Link } from "react-router-dom"

const BlogEntry = ({
  blog,
  toggleBtnOnClick,
  opAfterLikeBtnOnClick,
  opAfterRemoveBtnOnClick,
  showRemoveBtn,
}) => {
  const likeBtnOnClick = event => {
    const blogId =
      event.target.parentNode.parentNode.parentNode.getAttribute("data-id")
    opAfterLikeBtnOnClick(blogId)
  }
  const removeBtnOnClick = event => {
    const blogId = event.target.parentNode.parentNode.getAttribute("data-id")
    opAfterRemoveBtnOnClick(blogId)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid 1px black",
    marginBottom: 5,
  }
  return (
    <li data-id={blog.id} style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      <button className="toggle" onClick={toggleBtnOnClick}>
        {blog.toggle ? "hide" : "view"}
      </button>
      <div
        style={{ display: blog.toggle ? "" : "none" }}
        className={"togglableContent"}
      >
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button className="likes" onClick={likeBtnOnClick}>
            like
          </button>
        </div>
        {blog.userId && <div>{blog.userId.name}</div>}
        {showRemoveBtn && (
          <button className="remove" onClick={removeBtnOnClick}>
            remove
          </button>
        )}
      </div>
    </li>
  )
}

const Blogs = ({
  blogs,
  toggleBtnOnClick,
  opAfterLikeBtnOnClick,
  opAfterRemoveBtnOnClick,
  user,
}) => {
  return (
    <ul>
      {blogs
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map(blog => (
          <BlogEntry
            key={blog.id}
            blog={blog}
            toggleBtnOnClick={toggleBtnOnClick}
            opAfterLikeBtnOnClick={opAfterLikeBtnOnClick}
            opAfterRemoveBtnOnClick={opAfterRemoveBtnOnClick}
            showRemoveBtn={
              blog.userId && blog.userId.id === user.userId ? true : false
            }
          />
        ))}
    </ul>
  )
}

export default Blogs