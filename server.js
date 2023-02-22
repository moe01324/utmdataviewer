console.log('UTM Drone Sim Server running');
require("dotenv").config()

const express = require('express');
const fetch = require('node-fetch');
const { Headers } = require('node-fetch');
const app = express();

app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));

const alerts = [];
const OPs = [];

app.listen(8080, () => {
    console.log('listening on 8080');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/declareEndOfFlight', (req, res) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + req.body.access_token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(endendpoint+"/"+req.body.operationPlanId, requestOptions)
        .then(response => response.text())
         .then(result => console.log(result))
        .catch(error => console.log('error', error));

    res.status(201).json({
        result: "27"
    });
});

app.post('/authutm', (req, res) => {
    authUTM(req, res);
});

function authUTM(req, res) {
    client = req.body.client;
    secret = req.body.secret;

    fetch(keykloakendpoint, {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + client + '&client_secret=' + secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (resp) {
        return resp.json();
    }).then(function (data) {
        //console.log('token', data);
        res.status(201).json(data);
    }).catch(function (err) {
        // Log any errors
        console.log('something went wrong', err);
        res.status(400).json(err);
    });
}