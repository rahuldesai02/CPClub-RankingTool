const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const user_table = require('./models/db/')

//define path for express config
const viewsPath = path.join(__dirname, 'templates/views')
const partialsPath = path.join(__dirname, 'templates/partials')
const app = express()

const port = process.env.PORT || 3000

//configure handlebar engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const contributors = fs.readFileSync('contributors').toString().split('\n')

app.get('/user/:name', (req, res) => {
    res.render('index', {
        pagetitle: 'Fun JS Games | Home',
        title: 'Fun JS Games',
        gamelist,
        contributors
    })
})

app.listen(port, () => {
    console.log('Server is on on port ' + port)
})