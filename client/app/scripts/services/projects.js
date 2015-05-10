'use strict';

/**
 * Projects Rest Service
 *
 * @param {Object} $http Http service
 *
 * @constructor
 */
var ProjectsRestService = function ProjectsRestService($http, API) {
  var _get,
      _getAll,
      _create,
      _update,
      _remove;

  /**
   * Get a list of projects, or a project if the arguments has an id
   *
   * @param {Object} [args]  Function's arguments
   * @param {string} args.id Project id
   *
   * @return {HttpPromise}
   * @private
   */
  _get = function _get(args) {
    if(!!args && !!args.id) {
      return $http.get(API.host + '/projects/' + args.id);
    }

    return _getAll();
  };

  /**
   * Get list of projects
   *
   * @return {HttpPromise}
   * @private
   */
  _getAll = function _getAll() {
    return $http.get(API.host + '/projects');
  };

  /**
   * Create a project
   *
   * @param {Object} data Data structure representing a project
   *
   * @return {HttpPromise}
   * @private
   */
  _create = function _create(data) {
    return $http.post(API.host + '/projects', data);
  };

  /**
   * Update a project
   *
   * @param {Object} args      Arguments
   * @param {String} args.id   Project id
   * @param {Object} args.data Data structure representing a project
   *
   * @return {HttpPromise}
   * @private
   */
  _update = function _update(args) {
    return $http.put(API.host + '/projects/' + args.id, args.data);
  };

  /**
   * Remove a project
   *
   * @param {Object} args    Function's arguments
   * @param {string} args.id Project id
   *
   * @return {HttpPromise}
   * @private
   */
  _remove = function _remove(args) {
    return $http.delete(API.host + '/projects/' + args.id);
  };

  return {
    get: _get,
    create: _create,
    update: _update,
    remove: _remove
  };
};

angular.module('ccApp')
  .factory('ProjectsRestService', ['$http', 'API', ProjectsRestService]);
