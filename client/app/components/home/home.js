'use strict';

var HomeController = function HomeController($rootScope) {
  $rootScope.metaTitle = 'Nope';
  this.title = 'Hello World';
};

angular.module('ccApp.home', [])
  .controller('HomeController', ['$rootScope', HomeController]);
