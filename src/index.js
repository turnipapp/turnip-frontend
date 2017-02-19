var angular = require('angular');

var hello = require('./app/hello/hello');
var events = require('./app/events/events');
var profile = require('./app/profile/profile');
var eventReq = require('./app/event/event');

require('angular-ui-router');
var routesConfig = require('./routes');

require('./index.css');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .component('app', hello)
  .component('events', events)
  .component('event', eventReq)
  .component('profile', profile);
