'use strict';

var articleContentDirective = function articleContentDirective($sce) {
  return {
    restrict: 'A',
    scope: {
      content: '='
    },
    link: function(scope, el) {
      scope.$watch('content', function(content) {
        if(content) {
          var node = document.createElement('div');

          var openingCodeTagMatcher = '<codeblock lang=(\\"|\\\').+?(\\"|\\\')>';
          var contentCodeTagMatcher = '(.|\\s)+?';
          var closingCodeTagMatcher = '<\\/codeblock>';

          node.innerHTML = content;

          var codeElements = node.querySelectorAll('codeblock[lang]');
          var codeBlockRegex = new RegExp(openingCodeTagMatcher + contentCodeTagMatcher + closingCodeTagMatcher, 'gi');
          var codeMatches  = content.match(codeBlockRegex);

          var i = 0,
              length = codeElements.length;
          for(;i < length; i++) {
            var codeEl = codeElements.item(i),
                pre = document.createElement('pre'),
                codeTag = document.createElement('code'),
                code = codeMatches[i].replace(new RegExp(openingCodeTagMatcher, 'i'), '')
                                     .replace(new RegExp(closingCodeTagMatcher, 'i'), '');

            pre.innerHTML = hljs.highlight(codeEl.getAttribute('lang'), code).value;
            codeTag.innerHTML = pre.outerHTML;
            codeEl.outerHTML =  codeTag.outerHTML;
          }

          el.html(node.innerHTML);
        }
      });
    }
  };
};

angular.module('ccApp')
  .directive('articleContent', ['$sce', articleContentDirective]);
