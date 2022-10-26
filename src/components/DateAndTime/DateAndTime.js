import React, { useEffect, useState } from "react";
import { dayAndTime, todaysDate } from "../../utils/utils";
import './DateAndTime.scss'


const DateAndTime = () => {

    
    const [time,setTime] =useState(dayAndTime())

    useEffect( () => {
        setTimeout( () => {
            setTime(dayAndTime())
        },60000)
    },[time])

    return(
        <div className="date-time-container">
            <div className="todays-date">
              {todaysDate()}
            </div>
            <div className="day-time">
                {time}
            </div>
        </div>
    )
}

export default DateAndTime