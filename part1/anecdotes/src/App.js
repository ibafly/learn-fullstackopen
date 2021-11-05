import React, { useState } from "react"

const Title = ({ heading, text }) => {
  const TagName = `${heading}`
  return <TagName>{text}</TagName>
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const VoteStat = ({ text }) => <p>has {text} votes</p>

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(new Uint8Array(anecdotes.length))

  const pickAnecdote = () => setSelected(getDistinctRandomInt(anecdotes.length))
  const voteAnecdote = () => {
    let votedCopy = [...voted]
    votedCopy[selected] = votedCopy[selected] + 1
    setVoted(votedCopy)
  }

  function getDistinctRandomInt(max) {
    let rand = Math.floor(Math.random() * max)
    return rand === selected ? getDistinctRandomInt(max) : rand
  }
  function getIndexOfMax(arr) {
    return arr.indexOf(Math.max(...arr))
    // another way to get index of largest number in array:
    // arr.reduce((iMax, val, i, arr) => (val > arr[iMax] ? i : iMax), 0)
  }

  return (
    <div>
      <Title heading="h1" text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <VoteStat text={voted[selected]} />
      <Button onClick={voteAnecdote} text="vote" />
      <Button onClick={pickAnecdote} text="next anecdote" />

      <Title heading="h2" text="Anecdote with most votes" />
      <p>{anecdotes[getIndexOfMax(voted)]}</p>
    </div>
  )
}

export default App
