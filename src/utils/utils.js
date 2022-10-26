
export const todaysDate = () => {

    let dateObj=new Date();
    let months = ['Jan','Feb' ,'Mar' ,'Apr' ,'May',
                   'Jun','Jul','Aug','Sep','Oct',
                   'Nov','Dec'
                ]
    let month = months[dateObj.getMonth()]
    let year  = dateObj.getFullYear().toString().substr(-2)
    let date = `${dateObj.getDate()}${nthDaySuffix(dateObj.getDate())}`

    return `${date} ${month} ${year}`

}

const nthDaySuffix = ( date ) => {
    if(date>10 && date<21) return 'th';
    switch( date%10 )
    {
        case 1:return 'st';
        case 2:return 'nd';
        case 3:return 'rd';
        default:
            return 'th';
    }
}

export const dayAndTime = () => {

    let date = new Date()
    let days = ['Monday' , 'Tuesday' , 'Wednesday','Thursday','Friday','Saturday','Sunday']
    let day = days[date.getDay()-1]
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return `${day}  ${time}`

}

export const upComingDays = () => {

    let date = new Date()
    let days = ['Mon' , 'Tue' , 'Wed','Thur','Fri','Sat','Sun']

    let startIndex = date.getDay()-1
    let res= []
    let i=0;
    while( i < 5)
    {
        startIndex++
        res.push(days[startIndex%7])
        i++;
    }

    return res;
      
}

export const convertUnixToNormalTime = ( unixTime ) => {
  
    let date = new Date( unixTime * 1000)

    let timeObj = {
        hours:date.getHours(),
        mins:date.getMinutes(),
        secs:date.getSeconds(),
        time:date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }


    return timeObj;
    
}

export const celciusToFerhenit = ( temp ) => {
    const ans = (temp * (9/5))+32
    return ans.toFixed(2);
}

export const chancesOfRain = (pop) => {
    return (pop*100).toFixed(2);
}

export const qualityOfAir = ( index ) => {
    const qualities = [ 'Good' , 'Fair' , 'Moderate' , 'Poor' , 'Very Poor']
    return qualities[index-1]

}
export const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  )