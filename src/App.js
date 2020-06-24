import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [country, setCountry] = useState("")
  const [population, setPopulation] = useState([])
  const [emissions, setEmissions] = useState([])

  const handleChange = (event) => {
    setCountry(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Fetching data for " + country)
    fetchData()
  }
  const fetchData = () => {
    axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/SP.POP.TOTL?format=json`)
      .then((response) => {
        console.log(response.data)
        const populationArray = response.data[1].map(c => c.value)
        setPopulation(populationArray)
      })
    axios.get(`https://api.worldbank.org/v2/country/${country}/indicator/EN.ATM.CO2E.KT?format=json`)
    .then((response) => {
      console.log(response.data)
      const emissionsArray = response.data[1].map(c => c.value)
      setEmissions(emissionsArray)
    })
  }
  const result = () => {
    return (
      <p>CO2 emissions per capita (2014): {((emissions[5] / population[5]) * 1000).toFixed(1)} tons per capita</p>
    )
  }
  return (
    <div>
      <h1>CO2 Emissions</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="country">Country: </label>
        <input type="text" id="country" name="country" placeholder="Finland" onChange={handleChange}></input>
        <input type="submit" value="submit"></input>
      </form>
      {population.length === 0 ? null : result()}
    </div>
  )
}

export default App;
