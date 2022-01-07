import React from "react"
import { useDispatch } from "react-redux"
import { createNewFrom } from "../reducers/anecdoteReducer"

const AnecdoteForm = props => {
  const dispatch = useDispatch()

  const addNew = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createNewFrom(content))
  }

  return (
    <form onSubmit={addNew}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
