import React from "react"
// import { useDispatch } from "react-redux"
import { connect } from "react-redux"
import { createNewFrom } from "../reducers/anecdoteReducer"
import { setMsg } from "../reducers/notificationReducer"

const AnecdoteForm = props => {
  //const dispatch = useDispatch()

  const addNew = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    //    dispatch(createNewFrom(content))
    props.createNewFrom(content)

    //   dispatch(setMsg(`you added ${content}`, 5))
    props.setMsg(`you added ${content}`, 5)
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

const mapDispatchToProps = {
  createNewFrom,
  setMsg,
}
// --- alternative way to write mapDispatchToProps
//const mapDispatchToProps = dispatch => {
//  return {
//    createNewFrom: value => {
//      dispatch(createNewFrom(value))
//    },
//    setMsg: value => {
//      dispatch(setMsg(value))
//    },
//  }
//}
const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
//export default AnecdoteForm
export default connectedAnecdoteForm
