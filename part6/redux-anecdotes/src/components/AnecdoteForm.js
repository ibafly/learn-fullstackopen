import React from "react"
import { useDispatch } from "react-redux"
import anecdoteService from "../services/anecdotes"
import { createNewFrom } from "../reducers/anecdoteReducer"
import { clearMsg, showMsg } from "../reducers/notificationReducer"

const AnecdoteForm = props => {
  const dispatch = useDispatch()

  const addNew = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    //    const newAnecdote = await anecdoteService.create(content)
    dispatch(createNewFrom(content))

    dispatch(showMsg(`you added ${content}`))
    setTimeout(() => {
      dispatch(clearMsg())
    }, 5000)
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