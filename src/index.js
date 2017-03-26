require('./dependencies/as');
require('angular-cookies');

var create = require('./app/create/create');
var dashboard = require('./app/dashboard/dashboard');
var eventReq = require('./app/event/event');
var events = require('./app/events/events');
var hello = require('./app/hello/hello');
var login = require('./app/login/login');
var map = require('./app/map/map');
var profile = require('./app/profile/profile');
var signup = require('./app/signup/signup');
var profilesettings = require('./app/profilesettings/profilesettings');
var myprofile = require('./app/myprofile/myprofile');
var discussion = require('./app/discussion/discussion');

require('angular-ui-router');
require('angular-jwt');
var routesConfig = require('./routes');

require('./style/bootstrap-layout.css');
require('./style/index.css');
require('./style/header.css');
require('./style/events.css');
require('./style/create.css');
require('./style/event.css');

var app = 'app';
module.exports = app;

angular
  .module(app, ['ui.router', 'angular-jwt', 'angularStyle', 'ngCookies', 'ngMaterial'])
  .constant('API', {url: 'http://localhost:5000/'})
  .config(routesConfig)
  .component('app', hello)
  .component('create', create)
  .component('dashboard', dashboard)
  .component('event', eventReq)
  .component('events', events)
  .component('login', login)
  .component('map', map)
  .component('discussion', discussion)
  .component('profile', profile)
  .component('signup', signup)
  .component('profilesettings', profilesettings)
  .component('myprofile', myprofile);
