import React, { useState, useEffect } from "react"
import axios from "axios"

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <h3>capital {country.capital}</h3>
      <h3>population {country.population}</h3>
      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map(langAbbr => (
          <li key={langAbbr}>{country.languages[langAbbr]}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt="flag of {country.name.common}"
        width="300px"
      />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newQuery, setNewQuery] = useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all") // debug for a long time until i found i had forgot .com in domain. Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at $domain (Reason: CORS request did not succeed).
      .then(res => {
        setCountries(res.data)
      })
      .catch(err => {
        console.log("promise fail...")
      })
  }, [])

  const filteredEntries = countries.filter(country =>
    country.name.common
      .toLocaleLowerCase()
      .includes(newQuery.toLocaleLowerCase())
  )

  const sumOfEntries = filteredEntries.length

  const followNewQueryInput = event => {
    setNewQuery(event.target.value)
  }

  return (
    <div>
      <div>
        find countries:&nbsp;
        <input type="search" value={newQuery} onChange={followNewQueryInput} />
      </div>
      {sumOfEntries > 10 && <p>Too many matches, specify another filter</p>}
      {sumOfEntries <= 10 &&
        sumOfEntries > 1 &&
        filteredEntries.map(country => (
          <p key={country.cca2}>{country.name.common}</p>
        ))}
      {sumOfEntries === 1 && (
        <CountryDetail
          key={filteredEntries[0].tld.cca2}
          country={filteredEntries[0]}
        />
      )}
    </div>
  )
}

export default App
