import React, { useEffect, useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import Login from "./components/Login"
import NewBook from "./components/NewBook"
import Recommend from "./components/recommend"
import {
  useApolloClient,
  useMutation,
  useQuery,
  useLazyQuery,
  useSubscription,
} from "@apollo/client"
import { ME, ALL_BOOKS, BOOKS_BY_GENRE, LOGIN, BOOK_ADDED } from "./queries"

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
  // const [currentUser, setCurrentUser] = useState(null)
  const resultOfMe = useQuery(ME)

  const [books, setBooks] = useState([])
  const resultOfAllBooks = useQuery(ALL_BOOKS, {
    // pollInterval: 8000, // to update cache (1/n): poll server every 2 seconds. pros: update other users' changes automatically, cons: cost lots web traffic.
  })
  // if (!resultOfAllBooks.loading) {
  //   setBooks(resultOfAllBooks.data.allBooks)
  // }
  const [selectedGenre, setSelectedGenre] = useState("all genres")

  const [booksByGenre, resultOfBooksByGenre] = useLazyQuery(BOOKS_BY_GENRE)

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
  }, [resultOfLogin.data]) // eslint-disable-line

  useEffect(() => {
    resultOfMe.refetch()
  }, [token])

  const [favoriteGenreBooks, setFavoriteGenreBooks] = useState(null)
  useEffect(() => {
    console.log(resultOfMe.data)
    if (resultOfMe.data && resultOfMe.data.me) {
      booksByGenre({ variables: { genre: resultOfMe.data.me.favoriteGenre } })
    }
    if (resultOfBooksByGenre.data) {
      setFavoriteGenreBooks(resultOfBooksByGenre.data.allBooks)
    }
  }, [resultOfMe.data, resultOfBooksByGenre.data]) //eslint-disable-line

  useEffect(() => {
    if (resultOfAllBooks.data) {
      setBooks(resultOfAllBooks.data.allBooks)
      if (resultOfMe.data && resultOfMe.data.me) {
        // resultOfBooksByGenre.refetch({
        //   variables: { genre: currentUser.favoriteGenre },
        // })
        resultOfBooksByGenre.refetch({
          genre: resultOfMe.data.me.favoriteGenre,
        })
      }
    }
  }, [resultOfAllBooks.data]) // eslint-disable-line

  // useEffect(() => {
  //   resultOfBooksByGenre.refetch()
  // }, [books]) // eslint-disable-line

  const selectGenre = genre => {
    setSelectedGenre(genre)
  }

  useEffect(() => {
    resultOfAllBooks.refetch()
  }, [selectedGenre]) // eslint-disable-line

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      // notify()
      window.alert(`${addedBook.published} added`)
      updateCacheWith(addedBook)
    },
  })

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

      <Books
        show={page === "books"}
        books={books}
        btnOnClick={selectGenre}
        selectedGenre={selectedGenre}
      />

      <Login show={page === "login"} opAfterFormOnSubmit={handleLogin} />

      {token && resultOfMe.data && (
        <>
          <NewBook show={page === "add"} />

          <Recommend
            show={page === "recommend"}
            currentUser={resultOfMe.data.me}
            books={favoriteGenreBooks ? favoriteGenreBooks : null}
          />
        </>
      )}
    </div>
  )
}

export default App
