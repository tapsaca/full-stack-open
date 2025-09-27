import axios from 'axios'

const baseURL = 'https://api.openweathermap.org/data/2.5/'
const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getCityWeather = async (city) => {
  const response = await axios.get(`${baseURL}/weather?q=${city}&appid=${api_key}&units=metric`)
  return response.data
}

export default { getCityWeather }
