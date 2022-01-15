import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return action.content
    case "NEW_BLOG":
      return state.concat(action.content)
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
export default reducer
