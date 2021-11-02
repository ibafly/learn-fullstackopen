import React from "react"

const Header = props => <h1>{props.text}</h1>

const Content = props =>
  props.parts.map(i => <Part name={i.name} exercises={i.exercises} />)

const Part = props => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Total = props => (
  <p>
    Number of exercises{" "}
    {props.parts.reduce((partial_sum, i) => partial_sum + i.exercises, 0)}
  </p>
)

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to passing data", exercises: 7 },
      { name: "State of an component", exercises: 14 },
    ],
  }
  return (
    <div>
      <Header text={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

export default App
