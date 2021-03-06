'use strict';

/**
 * Admin Projects Controller
 *
 * @param {Object} projectsRestService Service for projects API
 *
 * @constructor
 */
var AdminProjectsController = function AdminProjectsController(projectsRestService) {
  this.list = [];
  this.projectsRestService = projectsRestService;

  projectsRestService.get()
    .success(function success(response) {
      this.list = response.data;
    }.bind(this))
    .error(function error() {});
};

/**
 * Remove a project
 *
 * @param {String} id Project ID
 */
AdminProjectsController.prototype.remove = function remove(id) {
  this.projectsRestService.remove({ id: id })
    .success(function success() {
      for(var projectIndex in this.list) {
        var project = this.list[projectIndex];
        if(project._id === id) {
          this.list.splice(projectIndex, 1);
          break;
        }
      }
    }.bind(this))
    .error(function error() {});
};

angular.module('ccAdmin.projects', [])
  .controller('AdminProjectsController', ['ProjectsRestService', AdminProjectsController]);
