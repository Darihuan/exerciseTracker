const express = require('express')
require('dotenv').config({path: "./db.env"})

const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000;
const DB = require("./database");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});
app.use(require('./controller/index'));


const listener = app.listen(PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
