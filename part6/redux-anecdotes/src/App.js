import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Notification from "./components/Notification"
import Filter from "./components/Filter"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import anecdoteService from "./services/anecdotes"
import store from "./store"
import { initiateFrom } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initiateFrom())
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
