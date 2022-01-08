import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteTo } from "../reducers/anecdoteReducer"
import { clearMsg, showMsg } from "../reducers/notificationReducer"

const AnecdoteList = props => {
  const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log("vote", id)
    dispatch(voteTo(id))

    dispatch(showMsg(`you voted ${content}`))
    setTimeout(() => {
      dispatch(clearMsg())
    }, 5000)
  }

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>
            vote
          </button>
        </div>
      </div>
    ))
}

export default AnecdoteList
