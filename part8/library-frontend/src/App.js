import React, { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import Login from "./components/Login"
import NewBook from "./components/NewBook"
import Recommend from "./components/recommend"
import { useApolloClient, useMutation, useQuery } from "@apollo/client"
import { ALL_BOOKS, LOGIN } from "./queries"

const App = () => {
  const [page, setPage] = useState("authors")
  const [error, setError] = useState("")

  const [token, setToken] = useState(null)
  const [login, resultOfLogin] = useMutation(LOGIN, {
    onError: error => {
      setError(error.graphQLErrors[0].message)
    },
    // refetchQueries: [{ query: ME }],
  })

  const [books, setBooks] = useState([])
  const resultOfAllBooks = useQuery(ALL_BOOKS, {
    // pollInterval: 8000, // to update cache (1/n): poll server every 2 seconds. pros: update other users' changes automatically, cons: cost lots web traffic.
  })
  // if (!resultOfAllBooks.loading) {
  //   setBooks(resultOfAllBooks.data.allBooks)
  // }

  const client = useApolloClient()

  useEffect(() => {
    const localToken = localStorage.getItem("loggedUserToken")
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  useEffect(() => {
    if (resultOfLogin.data) {
      const returnedToken = resultOfLogin.data.login.value
      setToken(returnedToken)
      window.localStorage.setItem("loggedUserToken", returnedToken)

      setPage("books")
    }
    if (resultOfAllBooks.data) {
      setBooks(resultOfAllBooks.data.allBooks)
    }
  }, [resultOfLogin.data, resultOfAllBooks.data]) // eslint-disable-line

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
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={handleLogout}>log out</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <div>{error}</div>
      <Authors show={page === "authors"} setError={setError} />

      <Books show={page === "books"} books={books} />

      <Login show={page === "login"} opAfterFormOnSubmit={handleLogin} />

      {token && (
        <>
          <NewBook show={page === "add"} />

          <Recommend show={page === "recommend"} allBooks={books} />
        </>
      )}
    </div>
  )
}

export default App
