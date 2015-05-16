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

angular.module('ccApp', ['ngNewRouter',
                         'ccApp.config',
                         'ccApp.home',
                         'ccApp.projects',
                         'ccApp.blog',
                         'ccApp.about',
                         'ccAdmin.home',
                         'ccAdmin.projects',
                         'ccAdmin.projects.edit',
                         'ccAdmin.articles'])
  .controller('AppController', ['$router', AppController]);

AppController.$routeConfig = [
  // Public routes
  { path: '/',         component: 'home' },
  { path: '/projects', component: 'projects' },
  { path: '/blog',     component: 'blog' },
  { path: '/about',    component: 'about' },

  // Admin routes
  { path: '/admin',                   component: 'adminHome' },
  { path: '/admin/projects',          component: 'adminProjects' },
  { path: '/admin/projects/create',   component: 'adminProjectsEdit', as: 'adminProjectsCreate' },
  { path: '/admin/projects/:id/edit', component: 'adminProjectsEdit' },
  { path: '/admin/articles',          component: 'adminArticles' },
  { path: '/admin/articles/create',   component: 'adminArticlesEdit', as: 'adminArticlesCreate' },
  { path: '/admin/articles/:id/edit', component: 'adminArticlesEdit' }
];
