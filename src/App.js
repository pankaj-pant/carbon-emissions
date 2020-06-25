import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import Chart from './Chart'

const App = () => {
  const [country, setCountry] = useState("")
  const [countryName, setCountryName] = useState("")
  const [population, setPopulation] = useState([])
  const [emissions, setEmissions] = useState([])
  const [years, setYears] = useState([])
  const [error, setError] = useState("")

  const handleChange = (event) => {
    setCountry(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Fetching data for " + country)
    fetchData()
  }
  const fetchData = () => {
    setCountryName("")
    setPopulation([])
    setEmissions([])
    setYears([])
    setError("")
    axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json`)
      .then((response) => {
        console.log(response.data)
        const populationArray = response.data[1].map(c => c.value)
        setPopulation(populationArray)
        const yearsArray = response.data[1].map(c => c.date)
        setYears(yearsArray)
        const name = response.data[1][0].country.value
        setCountryName(name)
      })
      .catch(err => {console.log(err)})
    axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/EN.ATM.CO2E.KT?format=json`)
    .then((response) => {
      console.log(response.data)
      const emissionsArray = response.data[1].map(c => c.value)
      setEmissions(emissionsArray)
    })
    .catch(err => {
      console.log(err)
      setError(`The World Bank API does not have the requested data on ${country} at the moment. 
      Please try searching for another country.`)
    })
  }
  const result = () => {
    return (
      <div>
        <p>CO2 emissions per capita (2014): {countryName} emits {" "}
         {((emissions[5] / population[5]) * 1000).toFixed(1)} tons of CO2 per capita in a year.
        </p>
        <Chart years={years} emissions={emissions} population={population} countryName={countryName}/>
      </div>
      
    )
  }
  return (
    <div>
      <h1>CO2 Emissions</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">Country: </label>
        <input type="text" id="country" name="country" placeholder="FI for Finland" onChange={handleChange}></input>
        <input type="submit" value="submit"></input>
        <a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes" target="__blank">Country codes</a>
      </form>
      {error.length === 0 ? null : <p> {error} </p>}
      {population.length === 0 ? null : result()}
    </div>
  )
}

export default App;
