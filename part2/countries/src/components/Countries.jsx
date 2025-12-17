import DetailedCountry from './DetailedCountry'
import SimpleCountry from './SimpleCountry'

const Countries = ({ countries }) => {
  if (countries.length === 0) {
    return <div>No matching countries</div>
  } else if (countries.length === 1) {
    return <DetailedCountry country={countries[0]} />
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map(country => <SimpleCountry key={country.name.common} country={country} />)}
      </div>
    )
  } else {
    return <div>Too many matches, specify another filter</div>
  }
}

export default Countries
