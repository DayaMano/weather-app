const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dayanidhi',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dayanidhi',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is the help page',
        name: 'Dayanidhi',
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide the Address',
        });
    }

    geocode(req.query.address, (geoError, { latitude, longitude, location} = {}) => {
        if(geoError) {
            return res.send({
                error: geoError
            });
        }
        
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if(forecastError) {
                return res.send({
                    error : forecastError
                });
            } 
            
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'User Name',
        errorMessage: 'Help articale Not found',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'User Name',
        errorMessage: 'Page Not found',
    });
});

app.listen(3000, () => {
    console.log('Server is up at port 3000');
});