'use strict';

var articleCoverDirective = function articleCoverDirective() {
return {
  restrict: 'A',
  scope: {
    coverSrc: '='
  },
  link: function(scope, el) {
    scope.$watch('coverSrc', function(coverSrc) {
      el[0].style.backgroundImage = 'url("' + coverSrc + '")';
    });
  }
};
};

angular.module('ccApp')
.directive('articleCover', [articleCoverDirective]);
