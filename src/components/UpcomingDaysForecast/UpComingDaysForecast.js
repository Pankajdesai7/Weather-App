import React, { useEffect, useState } from "react";
import { celciusToFerhenit, upComingDays } from "../../utils/utils";
import './UpComingDaysForecast.scss'


const UpComingDaysForecast = ( { forecastList , isCelcius }) => {

    const [next5Days , setnext5Days] =useState()
    

    useEffect(()=>{
        setnext5Days(upComingDays())
    },[])
    
    

    return(
        <div className="upcoming-days-forecast">
            { forecastList?.length > 1  ? (
                <>
                  {
                    forecastList?.map( (forecast ,index) => { 
                        if(index == 0)
                        {
                            return <></>
                        }
                        else
                        return(
                            <div className="days" key={index}>
                                <div>
                                    { isCelcius ? forecast?.main?.temp : celciusToFerhenit(forecast?.main.temp)}
                                    { isCelcius ? <>&deg;C</> : <>&deg;F</> }
                                </div>
                                <img src={`https://openweathermap.org/img/wn/${forecast?.weather[0]?.icon}@2x.png`}
                                width="50"
                                height="50"
                                />
                                <div> 
                                    {next5Days?.[index-1]}
                                </div>
                            </div>
                        )
                    })
                  }
                </> ): <> Unable to fetch upcoming days forecast , try again later </>
            }
        </div>
    )
}

export default UpComingDaysForecast