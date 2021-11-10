import React, { useState } from "react"

const Person = ({ person }) => <p>{person.name}</p>

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }])
  const [newName, setNewName] = useState("")

  const followNewNameInput = event => {
    setNewName(event.target.value)
  }
  const addPersonName = event => {
    event.preventDefault()
    const newNameObj = {
      name: newName,
    }
    setPersons(persons.concat(newNameObj))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersonName}>
        <div>
          name: <input value={newName} onChange={followNewNameInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  )
}

export default App
