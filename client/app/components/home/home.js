'use strict';

/**
 * Home Controller
 *
 * @param {Object} $rootScope App's root scope
 *
 * @constructor
 */
var HomeController = function HomeController($rootScope) {
  $rootScope.metaTitle = 'Nope';
  this.title = 'Hello World';
};

angular.module('ccApp.home', [])
  .controller('HomeController', ['$rootScope', HomeController]);
