const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

var stub = require('./stub');

const app = express();

//routes
const testimonialRoutes = require('./api/routes/testimonials');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE', 'GET');
        return res.status(200).json({});
    }
    next();
});

stub.getData();

//api route definition
app.use('/api/testimonials', testimonialRoutes);

//if the api method not found
app.use((req, res, next) => {
    //const error = new Error('Not found');
    //error.status = 404;
    //next(error);
    console.log('API not found');
});

module.exports = app;
