'use strict';

require('../../app/models/project');

var mongoose = require('mongoose'),
    Monky    = require('monky'),
    monky    = new Monky(mongoose);

monky.factory('Project', {
  name: 'Project#n'
});

module.exports = monky;
