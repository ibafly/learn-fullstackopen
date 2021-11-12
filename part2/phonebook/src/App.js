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
    axios
      .get("http://localhost:3001/persons")
      .then(res => {
        console.log(res.data)
        setPersons(res.data)
      })
      .catch(err => {
        console.log("axios.get fails")
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
      // date: new Date(), // let server side (not user browser )code generate id and time stamp
    }
    persons.find(
      person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    )
      ? alert(`${newName} is already added to phonebook`)
      : axios
          .post("http://localhost:3001/persons", newPersonInfoObj)
          .then(res => {
            setPersons(persons.concat(newPersonInfoObj))
          })
          .catch(err => {
            console.log("axios.post add new fails")
          })

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
