import React from "react"

const Header = props => <h1>{props.text}</h1>

const Content = props =>
  props.parts.map(i => <Part part={i.part} exercise={i.exercise} />)

const Part = props => (
  <p>
    {props.part} {props.exercise}
  </p>
)

const Total = props => (
  <p>
    Number of exercises{" "}
    {props.exercises.reduce((partial_sum, i) => partial_sum + i, 0)}
  </p>
)

const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercise1 = 10
  const part2 = "Using props to passing data"
  const exercise2 = 7
  const part3 = "State of an component"
  const exercise3 = 14

  return (
    <div>
      <Header text={course}></Header>
      <Content
        parts={[
          { part: part1, exercise: exercise1 },
          { part: part2, exercise: exercise2 },
          { part: part3, exercise: exercise3 },
        ]}
      ></Content>
      <Total exercises={[exercise1, exercise2, exercise3]}></Total>
    </div>
  )
}

export default App
