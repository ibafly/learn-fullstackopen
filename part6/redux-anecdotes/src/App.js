import React, { useEffect } from "react"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import anecdoteService from "./services/anecdotes"
import store from "./store"
import { initiateFrom } from "./reducers/anecdoteReducer"

const App = () => {
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => {
      store.dispatch(initiateFrom(anecdotes))
    }, [])
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
