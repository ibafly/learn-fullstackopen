import React from "react"
import { gql, useQuery } from "@apollo/client"

const ALL_BLOGS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`

const Books = props => {
  const result = useQuery(ALL_BLOGS, {
    pollInterval: 2000, // to update cache (1/n): poll server every 2 seconds. pros: update other users' changes automatically, cons: cost lots web traffic.
  })
  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
