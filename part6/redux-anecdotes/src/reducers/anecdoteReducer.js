const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    // id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
  console.log("state now: ", state)
  console.log("action", action)
  switch (action.type) {
    case "VOTE":
      return state.map(anecdoteObj =>
        anecdoteObj.id === action.id
          ? { ...anecdoteObj, votes: anecdoteObj.votes + 1 }
          : anecdoteObj
      )
    case "NEW_ANECDOTE":
      //      return state.concat(asObject(action.content))
      return state.concat(action.content)
    case "INIT_ANECDOTES":
      return action.content
    default:
      return state
  }
}

export const voteTo = id => {
  return { type: "VOTE", id }
}
export const createNewFrom = content => {
  return { type: "NEW_ANECDOTE", content }
}
export const initiateFrom = content => {
  return { type: "INIT_ANECDOTES", content }
}
export default reducer
