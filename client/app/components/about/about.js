'use strict';

/**
 * About Controller
 *
 * @param {Object} $rootScope App's root scope
 *
 * @constructor
 */
var AboutController = function AboutController($rootScope) {
  $rootScope.metaTitle = 'About';
  $rootScope.section = 'about';
};

angular.module('ccApp.about', [])
  .controller('AboutController', ['$rootScope', AboutController]);
