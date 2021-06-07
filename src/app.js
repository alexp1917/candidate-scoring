var express = require('express');
require('express-async-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

function makeApp(controllers, config) {
  var {
    baseUrl,
  } = config;

  var {
    homeController,
  } = controllers;

  var app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.post(baseUrl + '/', (r, s, n) => s.send('<h1>It Works!</h1>'));
  app.post(baseUrl + '/candidate', (r, s, n) => homeController.createCandidate(r, s, n));
  app.post(baseUrl + '/score', (r, s, n) => homeController.createScore(r, s, n));
  app.get(baseUrl + '/score/top', (r, s, n) => homeController.getTopScores(r, s, n));
  app.get(baseUrl + '/score/average', (r, s, n) => homeController.getAvgScores(r, s, n));

  return app;
}

module.exports = {
  makeApp,
};
