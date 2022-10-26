const API_KEY = '01e040aa6a086402fc71b6d7f5983cdb'
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast'

export const weatherUrl = ( city ) => {
    let url=`${baseUrl}?q=${city}&cnt=6&appid=${API_KEY}&units=metric`
    return url;
}

export const checkCityValidUrl = ( city ) => {

    let url = `${baseUrl}?q=${city}&cnt=1&appid=${API_KEY}`
    return url;
}

export const airQualityUrl = ( lat , lon ) => {
    let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    return url;
}
