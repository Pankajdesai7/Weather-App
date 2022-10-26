import React, { useState } from "react";
import { celciusToFerhenit } from "../../utils/utils";
import './TodaysTemperature.scss'


const TodaysTemperature = ({ temperature , iconCode , setIsMetricCelcius }) => {

    const [ isCelcius , setIsCelcius] = useState(true)
    const [ sliderClassName , setSliderClassName ] = useState('slider-cel')

    const handleToggle = () => {
        if(isCelcius)
        {
            setSliderClassName("slider-ferh")
        }
        else{
            setSliderClassName("slider-cel")
        }
        setIsCelcius(!isCelcius)
        setIsMetricCelcius(!isCelcius)
    }

    return(
        <div className="temperature-container">
           <div className="img-cont">
            <img src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
            alt="icon"
            />
            <div className="temp-toggle-container">
               <div className="toggle" onClick={handleToggle}>
                  <span className={sliderClassName}></span>
                  &deg;C &nbsp; &nbsp; &deg;F
               </div>
            </div>
           </div>
           
           <div>
              <span class="temp-value">{ isCelcius ? temperature : celciusToFerhenit(temperature)}
              <span className="temp-symbol"><sup>{ isCelcius ? <>&deg;C</> : <>&deg;F</>}</sup></span>
              </span>
           </div>
        </div>
    )
}

export default TodaysTemperature