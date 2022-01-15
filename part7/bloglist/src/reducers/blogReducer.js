import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.content
    case "NEW_BLOG":
      return state.concat(action.content)
    case "PLUS_LIKES":
      return state.map(blog => {
        return blog.id === action.id ? { ...blog, likes: blog.likes + 1 } : blog
      })
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== action.id)
    default:
      return state
  }
}

const format = blogs =>
  blogs.map(blog => {
    return { ...blog, toggle: false }
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
export const createNewBlogFrom = blogObj => {
  return async dispatch => {
    const blog = await blogService.create({ ...blogObj })
    console.log("blog", blog)

    dispatch({
      type: "NEW_BLOG",
      content: blog,
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
export default reducer
