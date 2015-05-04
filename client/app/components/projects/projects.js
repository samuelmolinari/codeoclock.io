'use strict';

/**
 * Projects Controller
 *
 * @param {Object} $rootScope App's root scope
 *
 * @constructor
 */
var ProjectsController = function ProjectsController($rootScope) {
  $rootScope.metaTitle = 'Projects';
};

angular.module('ccApp.projects', [])
  .controller('ProjectsController', ['$rootScope', ProjectsController]);
