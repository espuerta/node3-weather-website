const request = require('request')



const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=868ece29e070fe5d77b32727187e308e&query=' + latitude  + ',' + longitude + '&units=f'

    request({}, () => {
    
        request({ url, json: true}, (error, {body}) => {
             if(error){
                callback('Unable to connect to weather service', undefined)
             }else if(body.error){
                callback('Unable to find location', undefined)
             }else{
                
                 callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out ' + ' It feels likes ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%')
                 
             }
        })

    })

}

module.exports = forecast