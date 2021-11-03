import React, { useState } from "react"

const Title = ({ tag, text }) => {
  const TagName = `${tag}`
  return <TagName>{text}</TagName>
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Total = ({ sum, text }) => (
  <p>
    {text} {sum}
  </p>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOne = (counter, setFn) => () => setFn(counter + 1)

  return (
    <div>
      <Title tag="h1" text="give feedback" />
      <Button onClick={increaseByOne(good, setGood)} text="good" />
      <Button onClick={increaseByOne(neutral, setNeutral)} text="neutral" />
      <Button onClick={increaseByOne(bad, setBad)} text="bad" />
      <Title tag="h2" text="statistics" />
      <Total sum={good} text="good" />
      <Total sum={neutral} text="neutral" />
      <Total sum={bad} text="bad" />
    </div>
  )
}

export default App
