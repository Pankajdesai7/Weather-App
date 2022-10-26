import axios from 'axios'


const API_KEY = '01e040aa6a086402fc71b6d7f5983cdb'
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast'

export const fetchWeatherDetails = async( city ) => {

    let url=`${baseUrl}?q=${city}&cnt=1&appid=${API_KEY}`

    const { data } = await axios.get(url)
    console.log(data)
    return data  
}