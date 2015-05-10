require('../../app/models/project');

var mongoose = require('mongoose'),
    Project  = mongoose.model('Project'),
    Monky    = require('monky'),
    monky    = new Monky(mongoose);

monky.factory('Project', {
  name: 'Project#n'
});

module.exports = monky;
