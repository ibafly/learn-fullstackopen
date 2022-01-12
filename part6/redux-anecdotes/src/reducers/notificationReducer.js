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

let lastTimeoutId = undefined
export const setMsg = (content, duration) => {
  return async dispatch => {
    dispatch({
      type: "SET",
      content,
    })

    if (typeof lastTimeoutId === "number") {
      clearTimeout(lastTimeoutId) // cancel the last timeout fn to avoid message be cleared by last near click (timeout fn)
    }

    lastTimeoutId = await setTimeout(() => {
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
