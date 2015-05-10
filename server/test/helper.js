global.expect = require('chai').expect;
global.monky  = {};
global.app    = require('../app');

var mongoose = require('mongoose'),
    config   = require('../config/config'),
    fs = require('fs');

fs.readdirSync('./test/factories').forEach(function (file) {
  if(file.match(/\.js$/)) {
    global.monky[file.replace('.js', '')] = require('./factories/' + file);
  }
});

after(function() {
  mongoose.connection.db.dropDatabase();
});
