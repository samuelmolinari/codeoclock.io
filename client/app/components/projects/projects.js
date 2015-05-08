'use strict';

/**
 * Projects Controller
 *
 * @param {Object} $rootScope App's root scope
 *
 * @constructor
 */
var ProjectsController = function ProjectsController($rootScope, projectsRestService) {
  $rootScope.metaTitle = 'Projects';
  $rootScope.section = 'projects';
  this.list = [];

  projectsRestService.get()
    .success(function success() {
    }.bind(this))
    .error(function error() {
    }.bind(this));
};

angular.module('ccApp.projects', [])
  .controller('ProjectsController', ['$rootScope', 'ProjectsRestService', ProjectsController]);
