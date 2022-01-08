const reducer = (state = "default message", action) => {
  switch (action.type) {
    case "SHOW":
      return action.content
    case "CLEAR":
      return ""
    default:
      return state
  }
}

export const showMsg = content => {
  return {
    type: "SHOW",
    content,
  }
}
export const clearMsg = () => {
  return {
    type: "CLEAR",
  }
}
export default reducer
