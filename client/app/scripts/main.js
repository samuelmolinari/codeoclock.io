'use strict';

var AppController = function AppController ($router) {
  this.$router = $router;
};

angular.module('ccApp', ['ngNewRouter', 'ccApp.home'])
  .controller('AppController', ['$router', AppController]);

AppController.$routeConfig = [
  { path: '/', component: 'home' }
];
