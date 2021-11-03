import React, { useState } from "react"

const Title = ({ tag, text }) => {
  const TagName = `${tag}`
  return <TagName>{text}</TagName>
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const LineStatistic = ({ value, text }) => (
  <p>
    {text} {value}
  </p>
)

const Statistics = ({ valueObj }) => {
  const { good, neutral, bad } = valueObj
  if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>
  else
    return (
      <>
        <LineStatistic value={good} text="good" />
        <LineStatistic value={neutral} text="neutral" />
        <LineStatistic value={bad} text="bad" />
        <LineStatistic value={good + neutral + bad} text="all" />
        <LineStatistic
          value={(good - bad) / (good + neutral + bad)}
          text="average"
        />
        <LineStatistic value={good / (good + neutral + bad)} text="positive" />
      </>
    )
}

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
      <Statistics valueObj={{ good: good, neutral: neutral, bad: bad }} />
    </div>
  )
}

export default App
