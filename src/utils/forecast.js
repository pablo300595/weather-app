const request = require('request')
const forecast = (query, units, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=52a206f569a3ecb5f727f2bc561d2d0c&query=${query}&units=${units}`
    const options = {
      url,
      json: true,
      headers: {
        'User-Agent': 'request'
      }
    };
    request(options, (error, response, body) =>  {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]} It is currently ${body.current.temperature} degrees out. It feels like  ${body.current.feelslike} degrees out`) 
        }
            
    })
}

module.exports = forecast