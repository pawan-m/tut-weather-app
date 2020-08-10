const request = require('request');

const getCurrrentWeather = (latitude, long , callback) => { 
    const url = 'http://api.weatherstack.com/current?access_key=238250f311f11a06bf02bdddbc0966ec&query='+encodeURIComponent(latitude)+','+ encodeURIComponent(long);
    console.log(url);

    request.get({url:url, json:true}, (error, res) => { 
        const out = "The weather in " + res.body.location.name + ' is ' + res.body.current.temperature;
        if ( error ) { 
            callback('Error getting the details', undefined);
        } else if (res.error) {
            callback('Api retruned no data for the coordinates', undefined);
        } else {
            callback(undefined, out)
        }
    });
}

module.exports = {getCurrrentWeather:getCurrrentWeather}