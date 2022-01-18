import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.content
    case "NEW_BLOG":
      return state.concat(action.content)
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== action.id)
    case "PLUS_LIKES":
      return state.map(blog =>
        blog.id === action.id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    case "INJECT_COMMENTS":
      return state.map(blog =>
        blog.id === action.id ? { ...blog, comments: action.content } : blog
      )
    case "NEW_COMMENT":
      return state.map(blog =>
        blog.id === action.id
          ? {
              ...blog,
              commentIds: blog.commentIds.concat(action.content.id),
              comments: blog.comments.concat(action.content),
            }
          : blog
      )
    default:
      return state
  }
}

const format = blogs =>
  blogs.map(blog => {
    return { ...blog, toggle: false, comments: [] }
  })

export const initiateBlogs = () => {
  return async dispatch => {
    const blogsAtStart = await blogService.getAll()
    dispatch({
      type: "SET_BLOGS",
      content: format(blogsAtStart),
    })
  }
}
export const createNewBlogFrom = (user, blogObj) => {
  return async dispatch => {
    const blog = await blogService.create({ ...blogObj })
    console.log("blog", blog)

    dispatch({
      type: "NEW_BLOG",
      content: { ...blog, userId: { id: user.userId, name: user.name } }, // construct to expand userId which Blog component requires
    })
  }
}
export const likesPlusOneBy = (id, blogObj) => {
  return async dispatch => {
    await blogService.update(id, blogObj)
    dispatch({ type: "PLUS_LIKES", id })
  }
}
export const deleteBlogBy = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({ type: "DELETE_BLOG", id })
  }
}
export const injectCommentsToBlogBy = id => {
  return async dispatch => {
    const blog = await blogService.getOne(id)
    dispatch({ type: "INJECT_COMMENTS", id, content: blog.commentIds })
  }
}
export const createNewCommentTo = (id, commentObj) => {
  return async dispatch => {
    const comment = await blogService.createComment(id, commentObj)
    dispatch({ type: "NEW_COMMENT", id, content: comment })
  }
}
export default reducer
