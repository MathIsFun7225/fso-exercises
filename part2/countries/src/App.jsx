import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import Search from './components/Search'

const App = () => {
  const [query, setQuery] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  const [targetCountry, setTargetCountry] = useState(null)
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
        setCountries(response.data)
      })
      .catch(error => console.log(error))
  }, [])

  const handleQueryChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery)
    setTargetCountry(null)
    setCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(newQuery.toLowerCase())))
  }

  const showCountryView = (country) => () => setTargetCountry(country)

  return (
    <div>
      <Search query={query} handleQueryChange={handleQueryChange}/>
      <Countries countries={countries} targetCountry={targetCountry} showCountryView={showCountryView} />
    </div>
  )
}

export default App
