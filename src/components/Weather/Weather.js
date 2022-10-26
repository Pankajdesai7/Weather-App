import axios from "axios";
import React, { useEffect, useState } from "react";
import GaugeChart from 'react-gauge-chart'
import { FaWind } from 'react-icons/fa'
import { airQualityUrl } from "../../requests/request";
import { chancesOfRain, qualityOfAir } from "../../utils/utils";
import './Weather.scss';


const Weather = ({ humidity, rainChances, wind, lat, lon }) => {


  const [airQualityDetails, setAirQualityDetails] = useState()

  const fetchAirQualityDetails = (lat, lon) => {
    axios.get(airQualityUrl(lat, lon)).then((res) => {
      setAirQualityDetails(res.data)
    })

  }

  useEffect(() => {
    fetchAirQualityDetails(lat, lon)
  }, [lat, lon])

  return (
    <div className="weather-info-container">
      <div className="humidity-rain-container">
        <div className="humidity">

          <h3>Humidity</h3>
          <span>{humidity}%</span>
        </div>
        <div className="rain-chances">
          <h3>Chance of rain</h3>
          <span>{chancesOfRain(rainChances)}%</span>
        </div>
      </div>
      <div className="airquality-wind-container">
        <div className="air-quality">
          <h3>Air Quality</h3>
          <span>{airQualityDetails?.list[0]?.main?.aqi}</span>
          <div>{qualityOfAir(airQualityDetails?.list[0]?.main?.aqi)}</div>
        </div>
        <div className="wind">
          <h3>Wind Speed</h3>
          <span>{`${wind}  km/h `}<FaWind /></span>
        </div>
      </div>
    </div>
  )
}

export default Weather