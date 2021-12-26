import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [msg, setMsg] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState("")
  const [blogAuthor, setBlogAuthor] = useState("")
  const [blogUrl, setBlogUrl] = useState("")

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
    loggedUser && setUser(loggedUser) && blogService.setToken(loggedUser.token)
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
      blogService.setToken(user.token)

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

  const followTitleInput = event => {
    setBlogTitle(event.target.value)
  }
  const followAuthorInput = ({ target }) => {
    setBlogAuthor(target.value)
  }
  const followUrlInput = ({ target }) => {
    setBlogUrl(target.value)
  }
  const handleCreateBlog = async event => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      })
      console.log("blog", blog)
      setBlogs(blogs.concat(blog))
    } catch (excep) {
      console.log("exception:", excep)
    }

    setBlogTitle("")
    setBlogAuthor("")
    setBlogUrl("")
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
        <h2>create new</h2>
        <BlogForm
          titleInputVal={blogTitle}
          titleInputOnChange={followTitleInput}
          authorInputVal={blogAuthor}
          authorInputOnChange={followAuthorInput}
          urlInputVal={blogUrl}
          urlInputOnChange={followUrlInput}
          formOnSubmit={handleCreateBlog}
        />
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }

  return <div>{user === null ? loginSection() : userBlogSection()}</div>
}

export default App
