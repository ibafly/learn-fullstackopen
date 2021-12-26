import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import loginService from "./services/login"

const App = () => {
  const [msg, setMsg] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs))
      .catch(err => {
        console.log(err.response.data.error)
      })
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
    loggedUser && setUser(loggedUser)
    console.log(loggedUser)
  }, [])

  const followUsernameInput = event => {
    setUsername(event.target.value)
  }
  const followPasswordInput = event => {
    setPassword(event.target.value)
  }
  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
    } catch (excep) {
      setMsg("wrong credentials")
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    window.localStorage.removeItem("loggedUser")
    setUser(null)
  }

  const loginSection = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <LoginForm
          usernameInputVal={username}
          usernameInputOnChange={followUsernameInput}
          passwordInputVal={password}
          passwordInputOnChange={followPasswordInput}
          formOnSubmit={handleLogin}
        />
      </div>
    )
  }

  const userBlogSection = () => {
    return (
      <div>
        <h2>blogs</h2>
        <h3>
          {user ? user.name : ""} logged in
          <button onClick={handleLogout}>logout</button>
        </h3>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }

  return <div>{user === null ? loginSection() : userBlogSection()}</div>
}

export default App
