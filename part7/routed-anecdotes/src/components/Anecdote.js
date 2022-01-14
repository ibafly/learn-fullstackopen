import React, { Component, useState } from "react"

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h3>{anecdote.content}</h3>
      <p>
        has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}
      </p>
    </div>
  )
}

export default Anecdote
