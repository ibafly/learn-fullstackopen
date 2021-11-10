import React, { useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "abc", number: "040-1234567" },
    { name: "cuhj", number: "040-1234567" },
    { name: "ArtosHellas", number: "040-1234567" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newQuery, setNewQuery] = useState("")

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
