const request = require('request'); 

const getGeoCode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGF3YW4yNSIsImEiOiJja2Rrb2dkOXEwMWJlMnRxbHdidTM5ajFhIn0.ThbueQHDojI_iQu4_9ydyA&limit=1'

    request.get({ url:url, json:true }, (error, response) => {

        if ( error ) {
            callback("Problem getting the data from api", undefined);
        } else if (response.body.features.length === 0 ) {
            callback("Unable to get the co-ordinates", undefined)
        }
        else {
            data = {
                longitude :response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                place : response.body.features[0].place_name
            };
            callback(undefined, data);
        }
    })
};

module.exports = { getGeoCode : getGeoCode}
