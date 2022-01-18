import React, { useState, useEffect, useRef } from "react"
import { useRouteMatch, Switch, Route } from "react-router-dom"

import Header from "./components/Header"
import Blogs from "./components/Blogs"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import UserStatsTable from "./components/UserStatsTable"
import UserCreatedBlogList from "./components/UserCreatedBlogList"
import Blog from "./components/Blog"
import loginService from "./services/login"
import blogService from "./services/blogs"

import { useSelector, useDispatch } from "react-redux"
import { setMsg } from "./reducers/notificationReducer"
import {
  initiateBlogs,
  createNewBlogFrom,
  likesPlusOneBy,
  deleteBlogBy,
} from "./reducers/blogReducer"
import {
  //  loginUserFrom,
  logoutUser,
  setUserFrom,
} from "./reducers/loggedUserReducer"

const App = () => {
  const dispatch = useDispatch()
  const msg = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blog)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  //  const [user, setUser] = useState(null)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
    if (savedUser) {
      // setUser(savedUser)
      dispatch(setUserFrom(savedUser))
      blogService.setToken(savedUser.token)
    }

    dispatch(initiateBlogs())
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
      //setUser(returnedUser)
      dispatch(setUserFrom(returnedUser))
      window.localStorage.setItem("loggedUser", JSON.stringify(returnedUser))
      blogService.setToken(returnedUser.token)

      setUsername("")
      setPassword("")
    } catch (excep) {
      dispatch(setMsg("wrong credentials (username or password)", 5))
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser")
    dispatch(logoutUser())
  }

  const addBlog = async blogObj => {
    try {
      console.log(user, user.userId)
      dispatch(createNewBlogFrom(user, blogObj))

      togglableBlogFormRef.current.toggleVisibility() // fold blog form after successfully create a blog

      dispatch(
        setMsg(`a new blog ${blogObj.title} by ${blogObj.author} added`, 5)
      )
    } catch (excep) {
      console.log("exception:", excep)
    }
  }

  const plusOneLike = async blogId => {
    try {
      const foundBlog = blogs.find(blog => blog.id === blogId)
      const modifiedBlogForDb = {
        // remote DB data structure, userId is not expanded
        title: foundBlog.title,
        author: foundBlog.author,
        url: foundBlog.url,
        likes: foundBlog.likes + 1,
        userId: foundBlog.userId ? foundBlog.userId.id : null, // use condition for test purpose, eliminate console error when blog has no userId field.
      }
      dispatch(likesPlusOneBy(foundBlog.id, modifiedBlogForDb))
    } catch (excep) {
      console.log("exception:", excep)
    }
  }

  const deleteBlog = async blogId => {
    const foundBlog = blogs.find(blog => blog.id === blogId)
    const confirmed = window.confirm(
      `Remove blog ${foundBlog.title} by ${foundBlog.author}?`
    )
    if (confirmed) {
      try {
        dispatch(deleteBlogBy(foundBlog.id))
      } catch (excep) {
        console.log("exception:", excep)
      }
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
  const changeBlogToggle = event => {
    const blogId = event.target.parentNode.getAttribute("data-id")
    const modifiedBlogs = blogs.map(blog =>
      blog.id === blogId ? { ...blog, toggle: !blog.toggle } : blog
    )
    // setBlogs(modifiedBlogs)
    dispatch({ type: "SET_BLOGS", content: modifiedBlogs })
  }

  const userLink = useRouteMatch("/users/:id")
  const oneBlog = userLink
    ? blogs.find(blog => blog.userId && blog.userId.id === userLink.params.id)
    : null
  const userUnderView = oneBlog ? oneBlog.userId : null
  console.log(blogs, oneBlog, userUnderView)
  const blogListByOneUser =
    userLink && userUnderView
      ? blogs.filter(blog => blog.userId && blog.userId.id === userUnderView.id)
      : null

  const blogLink = useRouteMatch("/blogs/:id")
  const blogUnderView = blogLink
    ? blogs.find(blog => blog.id === blogLink.params.id)
    : null

  const loggedSection = () => {
    return (
      <div>
        <Header user={user} opAfterLogoutBtnOnClick={handleLogout} />
        <Notification message={msg} />

        <Switch>
          <Route path="/blogs/:id">
            <Blog blog={blogUnderView}></Blog>
          </Route>
          <Route path="/users/:id">
            <UserCreatedBlogList
              user={userUnderView}
              blogs={blogListByOneUser}
            />
          </Route>
          <Route path="/users">
            <h2>Users</h2>
            <UserStatsTable docs={blogs} />
          </Route>
          <Route path="/">
            <h2>create new</h2>
            <Togglable btnLabel={"create new blog"} ref={togglableBlogFormRef}>
              <BlogForm
                opAfterSubmit={addBlog} // do operation after form on submit
                cancelBtnOnClick={() => {
                  togglableBlogFormRef.current.toggleVisibility()
                }}
              />
            </Togglable>
            <Blogs
              blogs={blogs}
              user={user}
              toggleBtnOnClick={changeBlogToggle}
              opAfterLikeBtnOnClick={plusOneLike}
              opAfterRemoveBtnOnClick={deleteBlog}
            />
            <ul>
              {
                //          [...blogs]
                //            .sort((blogA, blogB) => blogB.likes - blogA.likes)
                //            .map(blog => (
                //              <Blog
                //                key={blog.id}
                //                blog={blog}
                //                toggleBtnOnClick={changeBlogToggle}
                //                opAfterLikeBtnOnClick={plusOneLike}
                //                opAfterRemoveBtnOnClick={deleteBlog}
                //                showRemoveBtn={
                //                  blog.userId && blog.userId.id === user.userId ? true : false
                //                }
                //              />
                //            ))
              }
            </ul>
          </Route>
        </Switch>
      </div>
    )
  }

  return <div>{user === null ? loginSection() : loggedSection()}</div>
}

export default App
