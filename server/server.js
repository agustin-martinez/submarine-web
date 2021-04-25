const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const port = 1234;

const { getAllBoats, addBoat, getBoat, deleteBoat, search, reset } = require('./database.js');

app.use( (req, res, next) => {
    next();
} )

app.use(express.static(__dirname + '/../public'))

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( bodyParser.json() )

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/boats', (req, res) => {
    getAllBoats(param => {
        res.send(param)
    });
})

app.get('/boat/:_id', (req, res) => {
    getBoat(req.params, param => {
        res.send(param)
    })
})

app.post('/boat?', (req, res) => {
    addBoat(req.body, param => {
        res.send(param)
    })
})

app.get('/search', (req, res) => {
    search(req.query, param => {
        res.send(param)
    })
})

app.delete('/boat/:_id', (req, res) => {
    deleteBoat(req.params, param => {
        res.send(param)
    })
})

app.post('/reset', (req, res) => {
    reset(req.body, param => {
        res.send(param)
    })
})

app.listen(port, () => {
    console.log('Web server listening on port ' + port)
})
