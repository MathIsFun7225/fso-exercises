import { useState, useEffect } from 'react'
import axios from 'axios'

const DetailedCountry = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    const apikey = import.meta.env.VITE_OPENWEATHERMAP_KEY

    const url =
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&exclude=minutely,hourly,daily,alerts&units=metric`

    axios.get(url)
         .then(response => {
           console.log(response.data)
           setWeather(response.data)
         })
         .catch(error => console.log(error))
  }, [])


  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area} km<sup>2</sup></div>
    
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
    
      <img src={country.flags.png} alt={country.flags.alt} />

      {(weather !== null) ? <div>
                              <h2>Weather in {country.capital[0]}</h2>
                              <div>Temperature: {weather.current.temp} {'\xB0'}C</div>
                              <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={weather.current.weather.description} />
                              <div>Wind Speed: {weather.current.wind_speed} m/s</div>
                            </div>
                          : <div></div>}
    </div>
  )
}

export default DetailedCountry
