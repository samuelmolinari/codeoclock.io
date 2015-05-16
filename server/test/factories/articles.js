'use strict';

require('../../app/models/article');

var mongoose = require('mongoose'),
    Monky    = require('monky'),
    monky    = new Monky(mongoose);

monky.factory('Article', {
  title: 'Article #n',
  content: '<h1>Hello World!</h1>'
});

module.exports = monky;
