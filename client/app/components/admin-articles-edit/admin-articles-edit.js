'use strict';

/**
 * Admin Admin Articles Controller
 *
 * @param {Object} articlesRestService Service for articles API
 *
 * @constructor
 */
var AdminArticlesEditController = function AdminArticlesEditController($router, $location, $routeParams, articlesRestService) {
  var id = $routeParams.id;
  this.submitActionName = id ? 'update' : 'create';
  this.$location = $location;
  this.$router = $router;
  this.articlesRestService = articlesRestService;
  this.article = {};

  if(id) {
    this.articlesRestService.get({ id: id })
      .success(function success(response) {
        this.article = response.data;
      }.bind(this))
      .error(function error() {});
  }
};

/**
 * Create a new article
 */
AdminArticlesEditController.prototype.create = function create() {
  this.articlesRestService.create(this.article)
    .success(function success(response) {
      this.$location.path(this.$router.generate('adminArticlesEdit', { id: response.data._id }));
    }.bind(this))
    .error(function error() {
    }.bind(this));
};

/**
 * Update an existing article
 */
AdminArticlesEditController.prototype.update = function update() {
  this.articlesRestService.update({ id: this.article._id, data: this.article })
    .success(function success() {})
    .error(function error() {
    }.bind(this));
};

angular.module('ccAdmin.articles.edit', ['ngNewRouter'])
  .controller('AdminArticlesEditController', ['$router', '$location', '$routeParams', 'ArticlesRestService', AdminArticlesEditController]);
