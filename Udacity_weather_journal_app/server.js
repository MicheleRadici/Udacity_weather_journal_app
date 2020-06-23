
// Setup empty JS object to act as endpoint for all routes
var ProjectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
 extended: false
}));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;


// Setup Server, Get route return ProjectData, Post route adds data to ProjectData

app.listen(port, () => {
    console.log("Server is running on " + port + " port");
});

app.get('/ALL', (req, res) => {
    res.send(JSON.stringify(ProjectData))
})  

app.post('/POSTDATA', (req, res) => {
    ProjectData = req.body;
    res.send(req.body);
})