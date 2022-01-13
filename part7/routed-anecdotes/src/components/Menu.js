import React, { Component, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import AnecdoteList from "./AnecdoteList"
import AnecdoteForm from "./AnecdoteForm"
import About from "./About"

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
      <Link style={padding} to="/create">
        create new
      </Link>
    </div>
  )
}
export default Menu
