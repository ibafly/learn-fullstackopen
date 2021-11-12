import React from "react"

const Person = ({ person, onClick, dataId }) => (
  <div data-id={dataId} data-name={person.name}>
    {person.name} {person.number}
    <button onClick={onClick}>delete</button>
  </div>
)
const Persons = ({ persons, btnOnClick }) =>
  persons.map(person => (
    <Person
      key={person.name}
      dataId={person.id} // i wonder why person.id can be assigned to dataId prop but not key prop. key={person.id} will arise `unique key` error in browser
      person={person}
      onClick={btnOnClick}
    />
  ))

export default Persons
