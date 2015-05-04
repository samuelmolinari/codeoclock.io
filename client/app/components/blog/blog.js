'use strict';

/**
 * Blog Controller
 *
 * @param {Object} $rootScope App's root scope
 *
 * @constructor
 */
var BlogController = function BlogController($rootScope) {
  $rootScope.metaTitle = 'Blog';
};

angular.module('ccApp.blog', [])
  .controller('BlogController', ['$rootScope', BlogController]);
