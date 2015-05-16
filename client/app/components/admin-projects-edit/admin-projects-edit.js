'use strict';

/**
 * Admin Home Controller
 *
 * @param {Object} projectsRestService Service for projects API
 *
 * @constructor
 */
var AdminProjectsEditController = function AdminProjectsEditController($router, $location, $routeParams, projectsRestService) {
  var id = $routeParams.id;
  this.submitActionName = id ? 'update' : 'create';
  this.$location = $location;
  this.$router = $router;
  this.projectsRestService = projectsRestService;
  this.project = {};

  if(id) {
    this.projectsRestService.get({ id: id })
      .success(function success(response) {
        this.project = response.data;
      }.bind(this))
      .error(function error() {});
  }
};


/**
 * Create a new project
 */
AdminProjectsEditController.prototype.create = function create() {
  this.projectsRestService.create(this.project)
    .success(function success(response) {
      this.$location.path(this.$router.generate('adminProjectsEdit', { id: response.data._id }));
    }.bind(this))
    .error(function error() {
    }.bind(this));
};

/**
 * Update an existing project
 */ 
AdminProjectsEditController.prototype.update = function update() {
  this.projectsRestService.update({ id: this.project._id, data: this.project })
    .success(function success() {})
    .error(function error() {
    }.bind(this));
};

angular.module('ccAdmin.projects.edit', ['ngNewRouter'])
  .controller('AdminProjectsEditController', ['$router', '$location', '$routeParams', 'ProjectsRestService', AdminProjectsEditController]);
