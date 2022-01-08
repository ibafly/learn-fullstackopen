import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteTo } from "../reducers/anecdoteReducer"

const AnecdoteList = props => {
  const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

  const vote = id => {
    console.log("vote", id)
    dispatch(voteTo(id))
  }

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ))
}

export default AnecdoteList
