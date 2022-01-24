import React, { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import Login from "./components/Login"
import NewBook from "./components/NewBook"
import { useApolloClient, useMutation } from "@apollo/client"
import { LOGIN } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [error, setError] = useState("")
  const [token, setToken] = useState(null)
  const [login, result] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    },
  })
  const client = useApolloClient()

  useEffect(() => {
    const localToken = localStorage.getItem("loggedUserToken")
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  useEffect(() => {
    if (result.data) {
      const returnedToken = result.data.login.value
      setToken(returnedToken)
      window.localStorage.setItem("loggedUserToken", returnedToken)

      setPage("books")
    }
  }, [result.data]) // eslint-disable-line

  const handleLogin = async (username, password) => {
    login({ variables: { username, password } })
  }
  const handleLogout = () => {
    //    window.localStorage.removeItem('loggedUserToken')
    localStorage.clear()
    setToken(null)
    client.resetStore()

    setPage("login")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={handleLogout}>log out</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <div>{error}</div>
      <Authors show={page === "authors"} setError={setError} />

      <Books show={page === "books"} />

      <Login show={page === "login"} opAfterFormOnSubmit={handleLogin} />

      <NewBook show={page === "add"} />
    </div>
  )
}

export default App
