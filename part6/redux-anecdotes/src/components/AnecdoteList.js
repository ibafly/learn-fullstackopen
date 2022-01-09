import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteTo } from "../reducers/anecdoteReducer"
import { setMsg } from "../reducers/notificationReducer"

const AnecdoteList = props => {
  const anecdotes = useSelector(state => state.anecdote)
  const filterText = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = ({ id, content, votes }) => {
    console.log("vote", id)
    dispatch(voteTo({ id, content, votes }))

    dispatch(setMsg(`you voted ${content}`, 5))
    //    setTimeout(() => {
    //      dispatch(clearMsg())
    //    }, 5000)
  }

  return anecdotes
    .filter(anecdote =>
      anecdote.content
        .toLocaleLowerCase()
        .includes(filterText.toLocaleLowerCase())
    )
    .sort((a, b) => b.votes - a.votes)
    .map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ))
}

export default AnecdoteList
