import { useEffect, useState } from 'react'
import weatherService from '../services/weatherService'

const Weather = ({ capital }) => {
  const [capitalWeather, setCapitalWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getCityWeather(capital)
      .then((weather) => setCapitalWeather(weather))
  }, [capital])

  if (!capitalWeather) return null

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature {capitalWeather.main.temp} Celsius</div>
      <img
        src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`}
        alt={`Icon for ${capitalWeather.weather[0].description}`} 
      />
      <div>Wind {capitalWeather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather
