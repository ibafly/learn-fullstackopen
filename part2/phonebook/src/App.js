import React, { useState, useEffect } from "react"
//import axios from "axios" // goes to services module
import personService from "./services/persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newQuery, setNewQuery] = useState("")
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(err => {
//        console.log("axios.get promise chain failed")
		setMsg(err.response.data.error)
		setMsgToNullLater()
      })
  }, [])

  function setMsgToNullLater() {
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

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
            setMsg("Updated number of " + foundPerson.name)
            setMsgToNullLater()
          })
          .catch(err => {
//            setMsg(foundPerson.name + " has already been removed from server")
			setMsg(err.response.data.error)
            setMsgToNullLater()
          })
      : personService
          .create(newPersonInfoObj)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setMsg("Added " + returnedPerson.name)
            setMsgToNullLater()
          })
          .catch(err => {
//            console.log("axios.post add new promise chain failed")
			setMsg(err.response.data.error)
			setMsgToNullLater()
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
//          console.log("person DELETE promise chain failed")
			setMsg(err.response.data.error)
			setMsgToNullLater()
        })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg} />
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
