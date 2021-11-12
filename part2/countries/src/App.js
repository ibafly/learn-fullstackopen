import React, { useState, useEffect } from "react"
import axios from "axios"

const CountryEntry = ({ country, onClick, toggle, dataIndex, weather }) => {
  return (
    <li data-index={dataIndex} data-capital={country.capital}>
      {country.name.common}&nbsp;
      <button onClick={onClick}>show</button>
      {toggle && (
        <CountryDetail key={country.cca2} country={country} weather={weather} />
      )}
    </li>
  )
}
const CountryDetail = ({ country, weather }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <h3>Capital {country.capital}</h3>
      <h3>Population {country.population}</h3>
      <h3>Spoken languages</h3>
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
      {weather && <WeatherDiv place={country.capital} weather={weather} />}
    </div>
  )
}

const WeatherDiv = ({ place, weather }) => {
  const fontBold = {
    // inline style in react requires an object and camelCased properties inside it.  some vender properties may have first cap, like: WebkitTransition (msTransition is not).
    fontWeight: "700",
  }
  const inline = {
    display: "inline",
    verticalAlign: "middle",
  }

  return (
    <div>
      <h3>
        Weather in {place}
        <img
          style={inline}
          src={weather.current.condition.icon}
          alt={"current weather in " + place}
          width="32px"
        />
      </h3>
      <p>
        <span style={fontBold}>temperature:</span> {weather.current.temp_c}{" "}
        Celcius
      </p>
      <p>
        <span style={fontBold}>wind:</span> {weather.current.wind_degree} mph
        direction {weather.current.wind_dir}
      </p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newQuery, setNewQuery] = useState("")
  const [detailToggles, setDetailToggles] = useState([])
  const [apiDataOfEntries, setApiDataOfEntries] = useState([])
  const weatherApiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all") // debug for a long time until i found i had forgot .com in domain. Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at $domain (Reason: CORS request did not succeed).
      .then(res => {
        setCountries(res.data)
        console.log(res.data)
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
    setApiDataOfEntries([])
  }

  function getApiData(idx, place) {
    console.log(apiDataOfEntries[idx])
    if (apiDataOfEntries[idx] === undefined) {
      console.log("into IF")
      axios
        .get(
          "https://api.weatherapi.com/v1/current.json?key=" +
            weatherApiKey +
            "&q=" +
            place
        )
        .then(res => {
          console.log(res.data)
          const apiDataOfEntriesCopy = [...apiDataOfEntries]
          apiDataOfEntriesCopy[idx] = res.data
          setApiDataOfEntries(apiDataOfEntriesCopy)
        })
        .catch(err => {
          console.log("axios.get weather fail...")
        })
    }
    return 1
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
    const idx = event.target.closest("li").getAttribute("data-index")
    const capital = event.target.closest("li").getAttribute("data-capital")
    const togglesCopy = [...detailToggles]

    togglesCopy[idx] = !togglesCopy[idx]
    setDetailToggles([...togglesCopy])

    getApiData(idx, capital)
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
            onClick={changeToggle} // get weather api data getApiData dispatched inside changeToogle
            toggle={detailToggles[i]}
            dataIndex={i} // data-index is a normal DOM custom attribute, so  start with data, data- in DOM
            weather={apiDataOfEntries[i]}
          />
        ))}
      {sumOfEntries === 1 && getApiData(0, filteredEntries[0].capital) && (
        <CountryDetail
          key={filteredEntries[0].cca2}
          country={filteredEntries[0]}
          weather={apiDataOfEntries[0]}
        />
      )}
    </div>
  )
}

export default App
