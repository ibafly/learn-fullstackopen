import React, { useState, useEffect } from "react"
//import axios from "axios" // goes to services module
import personService from "./services/persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newQuery, setNewQuery] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

    const foundPerson = persons.find(
      person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    )
    foundPerson
      ? window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        ) &&
        personService
          .update(foundPerson.id, newPersonInfoObj)
          .then(updatedPerson => {
            const newPersons = persons.map(person =>
              person.name === foundPerson.name ? updatedPerson : person
            )

            setPersons(newPersons)
          })
          .catch(err => {
            console.log("PUT failed")
          })
      : personService
          .create(newPersonInfoObj)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })
          .catch(err => {
            console.log("axios.post add new fails")
          })

    setNewName("")
    setNewNumber("")
  }

  const deletePerson = event => {
    const id = event.target.closest("div").getAttribute("data-id")
    const nameOfPersonToDelete = event.target
      .closest("div")
      .getAttribute("data-name")

    window.confirm("Delete " + nameOfPersonToDelete + "?") &&
      personService
        .remove(id)
        .then(returnedPerson => {
          console.log("DELETE response", returnedPerson) // it's a blank object
          const newPersons = persons.filter(
            person => person.name !== nameOfPersonToDelete
          )
          setPersons(newPersons)
        })
        .catch(err => {
          console.log("person DELETE fails")
        })
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
      <Persons persons={shownPersons} btnOnClick={deletePerson} />
    </div>
  )
}

export default App
