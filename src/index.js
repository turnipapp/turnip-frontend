var angular = require('angular');
require('./dependencies/as');

var dashboard = require('./app/dashboard/dashboard');
var eventReq = require('./app/event/event');
var events = require('./app/events/events');
var hello = require('./app/hello/hello');
var login = require('./app/login/login');
var map = require('./app/map/map');
var profile = require('./app/profile/profile');
var signup = require('./app/signup/signup');

require('angular-ui-router');
var routesConfig = require('./routes');

require('./style/bootstrap-layout.css');
require('./style/index.css');
require('./style/header.css');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router', 'angularStyle'])
  .config(routesConfig)
  .component('app', hello)
  .component('dashboard', dashboard)
  .component('event', eventReq)
  .component('events', events)
  .component('login', login)
  .component('map', map)
  .component('profile', profile)
  .component('signup', signup);
