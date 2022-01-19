import React from "react"
// import { Link } from "react-router-dom"

import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Button,
} from "@mui/material"

const BlogEntry = ({
  blog,
  toggleBtnOnClick,
  opAfterLikeBtnOnClick,
  opAfterRemoveBtnOnClick,
  showRemoveBtn,
}) => {
  const likeBtnOnClick = event => {
    const blogId =
      //   event.target.parentNode.parentNode.parentNode.getAttribute("data-id")
      event.target.parentNode.parentNode.getAttribute("data-id")
    opAfterLikeBtnOnClick(blogId)
  }
  const removeBtnOnClick = event => {
    const blogId = event.target.parentNode.parentNode.getAttribute("data-id")
    opAfterRemoveBtnOnClick(blogId)
  }
  //   const blogStyle = {
  //     paddingTop: 10,
  //     paddingLeft: 2,
  //     border: "solid 1px black",
  //     marginBottom: 5,
  //   }
  return (
    // <li data-id={blog.id} style={blogStyle}>
    //   <Link to={`/blogs/${blog.id}`}>
    //     {blog.title} {blog.author}
    //   </Link>
    //   <button className="toggle" onClick={toggleBtnOnClick}>
    //     {blog.toggle ? "hide" : "view"}
    //   </button>
    //   <div
    //     style={{ display: blog.toggle ? "" : "none" }}
    //     className={"togglableContent"}
    //   >
    //     <div>{blog.url}</div>
    //     <div>
    //       likes: {blog.likes}
    //       <button className="likes" onClick={likeBtnOnClick}>
    //         like
    //       </button>
    //     </div>
    //     {blog.userId && <div>{blog.userId.name}</div>}
    //     {showRemoveBtn && (
    //       <button className="remove" onClick={removeBtnOnClick}>
    //         remove
    //       </button>
    //     )}
    //   </div>
    // </li>

    <ListItem
      key={blog.id}
      secondaryAction={
        <div data-id={blog.id}>
          <span
            style={{ display: blog.toggle ? "" : "none" }}
            className={"togglableContent"}
          >
            <Box component="span" sx={{ mr: 1 }}>
              likes: {blog.likes}
            </Box>
            <Button
              sx={{ mr: 2 }}
              variant="outlined"
              size="small"
              className="likes"
              onClick={likeBtnOnClick}
            >
              like
            </Button>
            {blog.userId && (
              <Box component="span" sx={{ mr: 1 }}>
                {blog.userId.name}
              </Box>
            )}
            {showRemoveBtn && (
              <Button
                sx={{ mr: 2 }}
                variant="outlined"
                size="small"
                className="remove"
                onClick={removeBtnOnClick}
              >
                remove
              </Button>
            )}
          </span>
          <Button className="toggle" onClick={toggleBtnOnClick}>
            {blog.toggle ? "hide actions" : "actions"}
          </Button>
        </div>
      }
    >
      <ListItemButton component="a" href={`/blogs/${blog.id}`}>
        <ListItemText
          primary={`${blog.title} ${blog.author}`}
          secondary={blog.url}
        />
      </ListItemButton>
    </ListItem>
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
    <List>
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
    </List>
  )
}

export default Blogs
