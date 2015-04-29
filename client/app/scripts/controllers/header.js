'use strict';

/**
 * Header Controller
 *
 * @param {Object} $scope Controller's scope
 *
 * @constructor
 */
var HeaderController = function HeaderController($scope) {
  $scope.menu = {
    active: false
  };

  /**
   * Toggle menu on and off when on mobile devices
   */
  $scope.toggle = function toggle() {
    $scope.menu.active = !$scope.menu.active;
  };
};

angular.module('ccApp')
  .controller('HeaderController', ['$scope', HeaderController]);
