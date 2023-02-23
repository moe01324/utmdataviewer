console.log('UTM Drone Sim Server running');
require("dotenv").config()

const express = require('express');
const fetch = require('node-fetch');
const { Headers } = require('node-fetch');
const app = express();

app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));

app.listen(8080, () => {
    console.log('listening on 8080');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
