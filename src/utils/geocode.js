const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGF5YW5pZGhpIiwiYSI6ImNrcTZvaWF5ZTF1MzEyd3A4dmZnb210bnAifQ.egHFVAvUuE3Gg0sMMXf6Zw&limit=1`;

    // request({ url: url, json: true }, (error, response, body) => {
    request({ url, json: true }, (error, response, { message, features}) => {
        if(error) {
            callback('Unable to to connect Local Network!', undefined);
        } else if (message || features.length === 0) {
            if(message) {
                callback(message, undefined);
            } else {
                callback('Enter the Currect Location', undefined);
            }
        } else {
            callback(undefined, {
                Latitude : features[0].center[1],
                longitude : features[0].center[0],
                location: features[0].place_name,
            })
        }
    });
}

module.exports = geocode;