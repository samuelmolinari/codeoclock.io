'use strict';

/**
 * App's main controller
 *
 * @param {Object} $router Angular's new router
 *
 * @constructor
 */
var AppController = function AppController($router) {
  this.$router = $router;
};

angular.module('ccApp', ['ngNewRouter', 'ccApp.home'])
  .controller('AppController', ['$router', AppController]);

AppController.$routeConfig = [
  { path: '/',         component: 'home' },
  { path: '/projects', component: 'projects' },
  { path: '/blog',     component: 'blog' },
  { path: '/about',    component: 'about' }
];
