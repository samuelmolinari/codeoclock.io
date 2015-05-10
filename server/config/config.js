var env = process.env.APPLICATION_ENV || 'development';

module.exports = require('./environments/' + env);
