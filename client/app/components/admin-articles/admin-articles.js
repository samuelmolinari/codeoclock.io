'use strict';

/**
 * Admin Articles Controller
 *
 * @param {Object} articlesRestService Service for articles API
 *
 * @constructor
 */
var AdminArticlesController = function AdminArticlesController(articlesRestService) {
  this.list = [];
  this.articlesRestService = articlesRestService;

  articlesRestService.get()
    .success(function success(response) {
      this.list = response.data;
    }.bind(this))
    .error(function error() {});
};

/**
 * Remove an article
 *
 * @param {String} id Article ID
 */
AdminArticlesController.prototype.remove = function remove(id) {
  this.articlesRestService.remove({ id: id })
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

angular.module('ccAdmin.articles', [])
  .controller('AdminArticlesController', ['ArticlesRestService', AdminArticlesController]);
