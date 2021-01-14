const request = require('request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGFibG9lbmcwNSIsImEiOiJja2pvZXpwNTk1aTBsMnlwOWdwdHA5NGFwIn0.MjYORYbK4qR0oboe44XPtg&language=es&limit=1`
    const options = {
      url,
      json: true,
      headers: {
        'User-Agent': 'request'
      }
    };
    request(options, (error, {body}) => {
      if(error) {
        callback('Unable to connecto to location services', undefined)
      } else if(body.features.length === 0) {
        callback('Unable to find location. Try another search', undefined)
      } else {
        callback(undefined, {
          latitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name
        }) 
      }
    })
  }

  module.exports = geocode