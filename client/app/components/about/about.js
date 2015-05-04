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
};

angular.module('ccApp.about', [])
  .controller('AboutController', ['$rootScope', AboutController]);
