// Require the express module
const express = require('express');
const fs= require('fs');

// Create a new web server
const app = express();

// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));
// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));

let Routes= require('./www/js/classes/routes.class');
new Routes(app);


