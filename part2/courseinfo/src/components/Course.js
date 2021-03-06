import React from "react"

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Content = ({ parts }) => {
  return parts.map(part => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ))
}

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((iSum, part) => iSum + part.exercises, 0)
  return <p>Number of exercises {sum}</p>
}

export default Course
