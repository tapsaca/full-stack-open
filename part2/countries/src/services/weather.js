import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/'
const apiKey = import.meta.env.VITE_WEATHER_API

const getCityWeather = (city) => {
  const request = axios.get(
    `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`
  )
  return request.then((response) => response.data)
}

export default { getCityWeather }
