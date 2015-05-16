'use strict';

/**
 * Articles Rest Service
 *
 * @param {Object} $http Http service
 *
 * @constructor
 */
var ArticlesRestService = function ArticlesRestService($http, API) {
  var _get,
      _getAll,
      _create,
      _update,
      _remove;

  /**
   * Get a list of articles, or a article if the arguments has an id
   *
   * @param {Object} [args]  Function's arguments
   * @param {string} args.id Article id
   *
   * @return {HttpPromise}
   * @private
   */
  _get = function _get(args) {
    if(!!args && !!args.id) {
      return $http.get(API.host + '/articles/' + args.id);
    }

    return _getAll();
  };

  /**
   * Get list of articles
   *
   * @return {HttpPromise}
   * @private
   */
  _getAll = function _getAll() {
    return $http.get(API.host + '/articles');
  };

  /**
   * Create a article
   *
   * @param {Object} data Data structure representing a article
   *
   * @return {HttpPromise}
   * @private
   */
  _create = function _create(data) {
    return $http.post(API.host + '/articles', data);
  };

  /**
   * Update a article
   *
   * @param {Object} args      Arguments
   * @param {String} args.id   Article id
   * @param {Object} args.data Data structure representing a article
   *
   * @return {HttpPromise}
   * @private
   */
  _update = function _update(args) {
    return $http.put(API.host + '/articles/' + args.id, args.data);
  };

  /**
   * Remove a article
   *
   * @param {Object} args    Function's arguments
   * @param {string} args.id Article id
   *
   * @return {HttpPromise}
   * @private
   */
  _remove = function _remove(args) {
    return $http.delete(API.host + '/articles/' + args.id);
  };

  return {
    get: _get,
    create: _create,
    update: _update,
    remove: _remove
  };
};

angular.module('ccApp')
  .factory('ArticlesRestService', ['$http', 'API', ArticlesRestService]);
