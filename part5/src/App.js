import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [msg, setMsg] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [detailToggles, setDetailToggles] = useState([])
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
      const returnedUser = await loginService.login({ username, password })
      console.log(returnedUser)
      setUser(returnedUser)
      window.localStorage.setItem("loggedUser", JSON.stringify(returnedUser))
      blogService.setToken(returnedUser.token)

      setUsername("")
      setPassword("")
    } catch (excep) {
      setMsg("wrong credentials (username or password)", excep)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }
  const handleLogout = event => {
    window.localStorage.removeItem("loggedUser")
    setUser(null)
  }

  const addBlog = async blogObj => {
    try {
      console.log(user, user.id)
      const blog = await blogService.create({ ...blogObj })
      console.log("blog", blog)
      togglableBlogFormRef.current.toggleVisibility() // fold blog form after successfully create a blog
      setBlogs(blogs.concat(blog))

      setMsg(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    } catch (excep) {
      console.log("exception:", excep)
    }
  }

  const plusOneLike = async idx => {
    console.log(user, typeof user)
    const blog = blogs[idx]
    const blogLikePlusOne = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      userId: user.userId,
    }
    try {
      const updatedBlog = await blogService.update(blog.id, blogLikePlusOne)
      console.log(updatedBlog)
      blogs[idx] = updatedBlog
      setBlogs([...blogs])
    } catch (excep) {
      console.log("exception:", excep)
    }
  }

  const loginSection = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={msg} />
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

  const togglableBlogFormRef = useRef()
  const changeDetailToggles = event => {
    const idx = event.target.parentNode.getAttribute("data-index")
    const detailTogglesCopy = [...detailToggles]
    detailTogglesCopy[idx] = !detailTogglesCopy[idx]
    // console.log(
    //   event.target.parentNode.getAttribute("data-index"),
    //   idx,
    //   detailTogglesCopy
    // )
    setDetailToggles(detailTogglesCopy)
  }
  const userBlogSection = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={msg} />
        <h3>
          {user ? user.name : ""} logged in
          <button onClick={handleLogout}>logout</button>
        </h3>
        <h2>create new</h2>
        <Togglable btnLabel={"create new blog"} ref={togglableBlogFormRef}>
          <BlogForm
            opAfterSubmit={addBlog} // do operation after form on submit
            cancelBtnOnClick={() => {
              togglableBlogFormRef.current.toggleVisibility()
            }}
          />
        </Togglable>
        {blogs.map((blog, idx) => (
          <Blog
            key={blog.id}
            blog={blog}
            dataIndex={idx}
            toggleBtnOnClick={changeDetailToggles}
            toggle={detailToggles[idx]}
            opAfterLikeBtnOnClick={plusOneLike}
          />
        ))}
      </div>
    )
  }

  return <div>{user === null ? loginSection() : userBlogSection()}</div>
}

export default App
