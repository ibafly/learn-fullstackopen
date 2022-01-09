const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET":
      return action.content
    case "CLEAR":
      return ""
    default:
      return state
  }
}

export const setMsg = (content, duration) => {
  return async dispatch => {
    dispatch({
      type: "SET",
      content,
    })
    await setTimeout(() => {
      dispatch({
        type: "CLEAR",
      })
    }, duration * 1000)
  }
}
export const clearMsg = () => {
  return {
    type: "CLEAR",
  }
}
export default reducer
