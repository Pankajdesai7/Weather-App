import axios from "axios"
import React, { useEffect, useState } from "react"
import { FaMapMarkerAlt , FaPlus , FaInfo , FaAngleDoubleRight ,FaCloudRain} from 'react-icons/fa'
import { RiDropLine , RiSendPlane2Line} from 'react-icons/ri'
import { chancesOfRain, regionNames } from "../../utils/utils"
import DateAndTime from "../DateAndTime/DateAndTime"
import SunriseSunset from "../SunriseSunset/SunriseSunset"
import TodaysTemperature from "../TodaysTemperature/TodaysTemperature"
import UpComingDaysForecast from "../UpcomingDaysForecast/UpComingDaysForecast"
import Weather from "../Weather/Weather"
import "./WeatherDetails.scss"

const WeatherDetails = ( { city , closeModal } ) => {

    const [weatherDetails, setWeatherDetails] = useState()

    const [ isMetricCelcius , setIsMetricCelcius] = useState(true)


    const fetchWeatherDetails = ( city ) => {
        const API_KEY = '01e040aa6a086402fc71b6d7f5983cdb'
        const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast'
        let url=`${baseUrl}?q=${city}&cnt=6&appid=${API_KEY}&units=metric`
        axios.get(url).then( res => {
            setWeatherDetails(res.data)
        })

    }

    useEffect( () => {
        fetchWeatherDetails(city)
    },[])

    console.log(weatherDetails)

    return(
        <div className="weather-modal-background">
            <div className="weather-modal-container">
                <div className="left-panel">
                    <TodaysTemperature
                     temperature={weatherDetails?.list[0]?.main?.temp}
                     iconCode={weatherDetails?.list[0]?.weather[0]?.icon}
                     setIsMetricCelcius={setIsMetricCelcius}
                    />
                    <DateAndTime/>
                    <div className="todays-weather-details">
                        <div>
                            <span><RiSendPlane2Line/> {`  Wind ${weatherDetails?.list[0].wind.speed} km/h  `}</span> 
                            |
                            <span><RiDropLine/>{`  Hum ${weatherDetails?.list[0]?.main?.humidity}%  `}</span>
                            |
                            <span> <FaCloudRain/>{` Rain ${chancesOfRain(weatherDetails?.list[0]?.pop)} %`}</span>   
                        </div>
                    </div>
                    <UpComingDaysForecast
                     forecastList={weatherDetails?.list}
                     isCelcius={isMetricCelcius}
                    />
                </div>
                <div className="right-panel">
                    <div className="location-container">
                       <div className="location">
                         <FaMapMarkerAlt/> {weatherDetails?.city?.name}, 
                         { weatherDetails!==undefined && regionNames.of(weatherDetails?.city?.country)}
                       </div>
                       <div className="close-weather-details">
                           <button
                            className="close-weather-details-btn"
                            onClick={() => { closeModal(false) }}
                            >
                            <FaPlus/>
                           </button>
                       </div>
                    </div>
                    <SunriseSunset
                     sunriseTime={weatherDetails?.city?.sunrise}
                     sunsetTime={weatherDetails?.city?.sunset}
                    />
                    <div>
                     <div className="horizontal-line"> </div>
                    </div>
                    <Weather
                     humidity={weatherDetails?.list[0]?.main?.humidity}
                     rainChances={weatherDetails?.list[0]?.pop}
                     wind={weatherDetails?.list[0].wind.speed}
                    />
                </div>
            </div>
        </div>
    )

}

export default WeatherDetails