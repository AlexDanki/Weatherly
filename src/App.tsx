import { useState, useEffect } from 'react'
import './App.css'

interface LocationDataProp{
  cityWOSC: string
}

interface WeatherDataProp{
  name: string;
  weather:{
    description: string
  }
  main:{
    temp: string;
    humidity: string
  }
  wind:{
    speed: number
  }
}

function App() {

  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState<WeatherDataProp>()

useEffect(()=>{
  handleGetLocation()
    
},[])

async function handleGetWeather(location: string){
  const key = import.meta.env.VITE_API_WEATHER_KEY
  const city = location
  await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=pt_br`).
  then(response => response.json()).
  then((data: WeatherDataProp) => {
    setWeather(data)
  })
}

async function handleGetLocation(){
  const key = import.meta.env.VITE_API_LOCATION_KEY
  await fetch(`https://apiip.net/api/check?accessKey=${key}`).
  then(response => response.json()).
  then((data: LocationDataProp) => {
    //setLocation(String(data.cityWOSC))
    handleGetWeather(data.cityWOSC)
    console.log(location)
  })
}

  return (
    <div>
      <div className="weather-card">
      <h2>{weather?.name}</h2>
      <p>{weather?.weather.description}</p>
      <p>🌡️ {weather?.main.temp}°C</p>
      <p>💧 Umidade: {weather?.main.humidity}%</p>
      <p>🌬️ Vento: {weather?.wind.speed} km/h</p>
      <button onClick={handleGetLocation}>Conferir</button>
    </div>
    </div>
  )
}

export default App
