import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = async () => {
  const response = await axios.get(`${baseURL}/api/all`)
  return response.data
}

export default { getAll }
