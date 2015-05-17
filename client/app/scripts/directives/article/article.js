'use strict';

var articleDirective = function articleDirective() {
  return {
    restrict: 'A',
    scope: {
      article: '=',
    },
    templateUrl: '/scripts/directives/article/article.html'
  };
};

angular.module('ccApp')
  .directive('article', [articleDirective]);
