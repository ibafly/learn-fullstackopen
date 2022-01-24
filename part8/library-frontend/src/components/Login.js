import React from "react"
import { useField } from "../hooks"

const Login = ({ show, opAfterFormOnSubmit }) => {
  const { reset: resetUsername, ...username } = useField("text")
  const { reset: resetPassword, ...password } = useField("password")

  if (!show) {
    return null
  }

  const formOnSubmit = async e => {
    e.preventDefault()

    await opAfterFormOnSubmit(username.value, password.value)
    resetUsername()
    resetPassword()
  }

  return (
    <form onSubmit={formOnSubmit}>
      <div>
        username:
        <input {...username} />
      </div>
      <div>
        password:
        <input {...password} />
      </div>
      <button type="submit">log in</button>
    </form>
  )
}

export default Login
