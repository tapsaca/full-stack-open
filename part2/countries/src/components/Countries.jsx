import Country from './Country'

const Countries = ({ countries, filter }) => {
  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (!filter) return null

  if (filteredCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country) => <div key={country.cca2}>{country.name.common}</div>)}
      </div>
    )
  }

  if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries[0]} />
    )
  }
}

export default Countries
