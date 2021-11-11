import React, { useState, useEffect } from "react"
import axios from "axios"

const CountryEntry = ({ country, onClick, toggle, currentidx }) => {
  return (
    <li currentidx={currentidx}>
      {country.name.common}&nbsp;
      <button onClick={onClick}>show</button>
      {toggle && <CountryDetail key={country.cca2} country={country} />}
    </li>
  )
}
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
  const [detailToggles, setDetailToggles] = useState([])

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

  const filteredEntries = newQuery
    ? countries.filter(country =>
        country.name.common
          .toLocaleLowerCase()
          .includes(newQuery.toLocaleLowerCase())
      )
    : []
  const sumOfEntries = filteredEntries.length

  const followNewQueryInput = event => {
    setNewQuery(event.target.value)
    setDetailToggles([])
  }

  const changeToggle = event => {
    // if (detailToggles) {
    //   console.log(sumOfEntries, detailToggles)
    //   const allZeroArr = Array(sumOfEntries).fill("0")
    //   // setDetailToggles(Array(sumOfEntries).fill(0))
    //   setDetailToggles([...allZeroArr])
    //   console.log("in IF", detailToggles)
    // } else {
    // NO NEED to init to a all zero array!
    const idx = event.target.closest("li").getAttribute("currentidx")
    const togglesCopy = [...detailToggles]
    togglesCopy[idx] = !togglesCopy[idx]
    setDetailToggles([...togglesCopy])
    // console.log("in ELSE", detailToggles)
    // }
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
        filteredEntries.map((country, i) => (
          <CountryEntry
            key={country.cca2}
            country={country}
            onClick={changeToggle}
            toggle={detailToggles[i]}
            currentidx={i} // currentidx is a normal DOM custom attribute, so in /all lowercase
          />
        ))}
      {sumOfEntries === 1 && (
        <CountryDetail
          key={filteredEntries[0].cca2}
          country={filteredEntries[0]}
        />
      )}
    </div>
  )
}

export default App
