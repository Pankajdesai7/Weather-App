import React from "react";
import { FaWind } from 'react-icons/fa'
import { chancesOfRain } from "../../utils/utils";
import './Weather.scss';


const Weather = ( { humidity , rainChances , wind}) => {

    return(
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
                <span>{humidity}</span>
             </div>
             <div className="wind">
               <h3>Wind Speed</h3>
                <span>{`${wind}  km/h `}<FaWind/></span>
             </div>
            </div>
        </div>
    )
}

export default Weather