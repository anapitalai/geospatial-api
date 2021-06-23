'use strict';
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//routes
const crimeRoutes = require('./api/routes/crimes');
const roadRoutes = require('./api/routes/roads');
const buildingRoutes = require('./api/routes/buildings');


const app = express();

app.use(express.json())


app.use(morgan('dev'));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
  next();
});

app.use('/api/v1/roads', roadRoutes);
app.use('/api/v1/buildings', buildingRoutes);
app.use('/api/v1/crimes', crimeRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message }
  });
});


module.exports = app;