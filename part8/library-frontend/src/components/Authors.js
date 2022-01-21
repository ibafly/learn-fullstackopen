import React, { useState, useEffect } from "react"
import Select from "react-select"
import { useField } from "../hooks"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = ({ show, setError }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  // const { reset: resetName, ...name } = useField("text")
  const { reset: resetBorn, ...born } = useField("text")
  const result = useQuery(ALL_AUTHORS)
  const [setAuthorBorn, res] = useMutation(EDIT_AUTHOR, {
    // res as the result of query
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  useEffect(() => {
    if (res.data && res.data.editAuthor === null) {
      // returned data error handling
      setError("author not found")
    }
  }, [res.data, setError])
  // put setError in useEffect array or comment this line with eslint-disable-line
  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  const options = authors.map(author => {
    return { value: author.name, label: author.name }
  })
  const handleSubmit = e => {
    e.preventDefault()
    console.log(selectedOption)
    setAuthorBorn({
      variables: { name: selectedOption.value, born: Number(born.value) },
    })

    // resetName()
    setSelectedOption(null)
    resetBorn()
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="name">
          name <input id="name" {...name} />
        </label> */}
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <br />
        <label htmlFor="born">
          born <input id="born" {...born} />
        </label>
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
