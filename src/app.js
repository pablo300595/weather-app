const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
const { read } = require('fs')
const app = express()

// Define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pablo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Pablo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help Message',
        name: 'Pablo' 
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query)
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        console.log('Data', {latitude, longitude, location})
        if(error) return res.send({error})
        
        forecast(latitude+','+longitude, 'f', (error, forecastData) => {
            if(error) return res.send({error})
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help Message',
        name: 'Pablo',
        errorMessage: 'Help Article Not found' 
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help Message',
        name: 'Pablo',
        errorMessage: 'Not found' 
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server started!')
})