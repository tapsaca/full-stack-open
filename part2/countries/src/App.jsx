import { useEffect, useState } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getAllCountries()
      .then((returnedCountries) => setCountries(returnedCountries))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {filter ? <Countries countries={countries} filter={filter} setFilter={setFilter} /> : null}
    </div>
  )
}

export default App
