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
      _getAll;

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

  return {
    get: _get
  };
};

angular.module('ccApp')
  .factory('ProjectsRestService', ['$http', 'API', ProjectsRestService]);
