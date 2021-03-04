const path = require('path')
const express = require('express')
const hbs = require('hbs')
const  geocode = require('./utils/gecode')
const forecast = require('./utils/forecast')

const app  = express()
const port = process.env.PORT || 3000
//Define paths or express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Janellis'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About me',
        name: 'Janellis'
    })
})

app.get('/help', (req, res) => {

    res.render('help', {
        helpText: 'you need help?',
        title: 'Help',
        name: "Janellis"
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {

        return res.send({
            error: 'You must provide a search term'
        })


    }
        console.log(req.query)
        res.send({
            products: []
        })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })



    }

    geocode(req.query.address, (error, {latitude, longitude, location} = { }) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({ error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
              })
          })

         })
    })

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Janellis',
        errorMessage:"Help article not found"
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Janellis',
        errorMessage: 'Page not found'
    })
})
        

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})