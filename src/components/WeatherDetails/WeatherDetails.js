import axios from "axios"
import React, { useEffect, useState } from "react"
import { FaMapMarkerAlt , FaPlus , FaInfo , FaAngleDoubleRight ,FaCloudRain} from 'react-icons/fa'
import { RiDropLine , RiSendPlane2Line} from 'react-icons/ri'
import { weatherUrl } from "../../requests/request"
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
    const [ apiCallFailed , setApiCallFailed] = useState(false)


    const fetchWeatherDetails = ( city ) => {
        axios.get(weatherUrl(city)).then( res => {
            setWeatherDetails(res.data)
        }).catch( () =>{
           setApiCallFailed(true)
        })
    }

    useEffect( () => {
        fetchWeatherDetails(city)
    },[])

    return(
        <div className="weather-modal-background">
            <div className="weather-modal-container">
                <div className="left-panel">
                    { apiCallFailed ? <> Server Error Try Again Later</> :
                     (
                     <TodaysTemperature
                     temperature={weatherDetails?.list[0]?.main?.temp}
                     iconCode={weatherDetails?.list[0]?.weather[0]?.icon}
                     setIsMetricCelcius={setIsMetricCelcius}
                    />
                     )
                    }
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
                    { apiCallFailed ? <> Server Error Try Again Later</> :
                       <SunriseSunset
                       sunriseTime={weatherDetails?.city?.sunrise}
                       sunsetTime={weatherDetails?.city?.sunset}
                      />
                    }
                    <div>
                     <div className="horizontal-line"> </div>
                    </div>
                    { apiCallFailed ? <>Server Error Try Again Later</> : 
                      <Weather
                      humidity={weatherDetails?.list[0]?.main?.humidity}
                      rainChances={weatherDetails?.list[0]?.pop}
                      wind={weatherDetails?.list[0].wind.speed}
                      lat={weatherDetails?.city?.coord?.lat}
                      lon={weatherDetails?.city?.coord?.lon}
                     />
                    }
                </div>
            </div>
        </div>
    )

}

export default WeatherDetails