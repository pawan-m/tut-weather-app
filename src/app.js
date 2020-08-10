const path = require('path')
const express = require('express')
const hbs = require('hbs')
const gc = require('utils/geocode.js')
const cw = require('utils/getcurrentweather.js')

const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname,  '../template/partials')

const port = process.env.PORT || 3000

const app = express()

app.use(express.static(publicPath))

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('/', (req, res) => { 
    res.render("index", {
        'title': "Home",
        'name': "James Bond"
    })
})

app.get('/about', (req, res) => { 
    res.render("about", {
        'title': "About",
        'name': "James Bond"
    })
})

app.get('/help', (req, res) => { 
    res.render("help", {
        'title': "Help",
        'name': "James Bond"
    })
})

app.get('/weather', (req, res) => { 

    if ( ! req.query.address ) {
        return res.send({error:"There is no locaiton provided"})
    }

    const address = req.query.address

    gc.getGeoCode(address, (error, data) => {
        if ( error ) {
            return res.send({error:"There is an error getting weather details"})
        } 

        cw.getCurrrentWeather( data.latitude, data.longitude, (error, fdata) => res.send({forecast:fdata, address}))
    })
})

app.get('*', (req, res) => { 
    res.render("404", {
        'title': "404",
        'name': "James Bond"
    })
})



app.listen(port, () => {
    console.log("Starting server on port " + port + "....")
})