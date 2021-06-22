const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=80263c2070d1fc46e381da3484e2dfb9&query=${latitude},${longitude}`;

    // request({ url: url, json: true }, (error, response, body) => {
    request({ url, json: true }, (error, response, { error: bodyError, current}) => {
        if(error) {
            callback("Unalble to connect to weather services", undefined);
        } else if(bodyError) {
            callback(bodyError.info, undefined);
        } else {
            callback(undefined, `${current.weather_descriptions[0]} It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`);
        }
    });
}

module.exports = forecast;