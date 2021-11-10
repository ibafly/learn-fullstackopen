import React, { useState } from "react"

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
)

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
      <div>
        filter shown with:
        <input type="search" value={newQuery} onChange={followNewQueryInput} />
      </div>
      <form onSubmit={addPersonInfo}>
        <div>
          name: <input value={newName} onChange={followNewNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={followNewNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {shownPersons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  )
}

export default App
