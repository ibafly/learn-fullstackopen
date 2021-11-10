import React, { useState, useEffect } from "react"
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "setPersons", number: "040-1234567" },
    { name: "setState", number: "040-1234567" },
    { name: "initial", number: "040-1234567" },
    { name: "data", number: "040-1234567" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newQuery, setNewQuery] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(res => {
      setPersons(res.data)
    })
  }, [])

  const shownPersons = persons.filter(person =>
    person.name.toLocaleLowerCase().includes(newQuery.toLocaleLowerCase())
  ) || [...persons]

  const followNewNameInput = event => {
    setNewName(event.target.value)
  }

  const followNewNumberInput = event => {
    setNewNumber(event.target.value)
  }

  const followNewQueryInput = event => {
    setNewQuery(event.target.value)
  }

  const addPersonInfo = event => {
    event.preventDefault()

    const newPersonInfoObj = {
      name: newName,
      number: newNumber,
    }
    persons.find(
      person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    )
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPersonInfoObj))

    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        inputType="search"
        inputVal={newQuery}
        inputOnChange={followNewQueryInput}
      />
      <h3>Add a new</h3>
      <PersonForm
        formOnSubmit={addPersonInfo}
        nameInputVal={newName}
        nameInputOnChange={followNewNameInput}
        numberInputVal={newNumber}
        numberInputOnChange={followNewNumberInput}
      />
      <h3>Numbers</h3>
      <Persons persons={shownPersons} />
    </div>
  )
}

export default App
