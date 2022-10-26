import React from "react";
import { FaCloudSun } from 'react-icons/fa';
import { convertUnixToNormalTime } from "../../utils/utils";
import Clock from "../Clock/Clock";
import "./SunriseSunset.scss"


const SunriseSunset = ( {sunriseTime , sunsetTime }) => {


    const xyz = convertUnixToNormalTime(sunriseTime)
    const xyz1 =convertUnixToNormalTime(sunsetTime)

    return(
        <div className="sunrise-sunset-container">
            <div className="sunrise-container">
               Sunrise
               <div className="sunrise">
                   <Clock 
                    hours={xyz.hours}
                    minutes={xyz.mins}
                    seconds={0}
                    ></Clock>
                    <div className="time"> {xyz.time} </div>
                    <div className="sun-icon">
                        <FaCloudSun size={35}/>
                    </div>
               </div>
            </div>
            <div className="">
                Sunset
                <div className="sunset">
                   <Clock 
                    hours={xyz1.hours}
                    minutes={xyz1.mins}
                    seconds={0}
                    ></Clock>
                    <div className="time"> {xyz1.time}</div>
                    <div className="sun-icon">
                        <FaCloudSun size={35}/>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default SunriseSunset