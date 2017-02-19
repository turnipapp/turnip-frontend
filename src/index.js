var angular = require('angular');
require('./dependencies/as');

var hello = require('./app/hello/hello');
var dashboard = require('./app/dashboard/dashboard');
var events = require('./app/events/events');
var profile = require('./app/profile/profile');
var eventReq = require('./app/event/event');
var map = require('./app/map/map');

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
  .component('map', map)
  .component('profile', profile);
