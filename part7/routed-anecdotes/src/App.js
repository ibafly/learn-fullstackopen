import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useRouteMatch } from "react-router-dom"
import Menu from "./components/Menu"
import Notification from "./components/Notification"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Anecdote from "./components/Anecdote"
import About from "./components/About"
import Footer from "./components/Footer"

const App = () => {
  const [msg, setMsg] = useState("")
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ])

  const [notification, setNotification] = useState("")

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

    setMsg(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setMsg("")
    }, 10000)
  }

  const anecdoteById = id => anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
  }

  const match = useRouteMatch("/anecdotes/:id")
  const anecdote = match
    ? anecdotes.find(one => one.id === match.params.id)
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={msg} />

      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <AnecdoteForm addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App
