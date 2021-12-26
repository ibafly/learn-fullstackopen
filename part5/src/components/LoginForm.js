import React from "react"
const LoginForm = ({
  usernameInputVal,
  passwordInputVal,
  usernameInputOnChange,
  passwordInputOnChange,
  formOnSubmit,
}) => (
  <form onSubmit={formOnSubmit}>
    <div>
      <label for="username">username:</label>
      <input
        type="text"
        id="username"
        value={usernameInputVal}
        onChange={usernameInputOnChange}
      />
    </div>
    <div>
      <label for="password">password:</label>
      <input
        type="password"
        id="password"
        value={passwordInputVal}
        onChange={passwordInputOnChange}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm
