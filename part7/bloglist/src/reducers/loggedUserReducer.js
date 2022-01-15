// import loginService from "../services/login"

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user
    case "RESET_USER":
      return null
    default:
      return state
  }
}

export const setUserFrom = user => {
  return dispatch => {
    dispatch({ type: "SET_USER", user })
  }
}
//export const loginUserFrom = (username, password) => {
//  return async dispatch => {
//    const user = await loginService.login({ username, password })
//    dispatch({ type: "SET_USER", user })
//  }
//}
export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: "RESET_USER" })
  }
}
export default reducer
