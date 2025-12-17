const SimpleCountry = ({ country, showCountryView }) => (
  <div>
    {country.name.common} <button type="button" onClick={showCountryView(country)}>Show</button>
  </div>
)

export default SimpleCountry
