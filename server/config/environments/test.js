module.exports = {
  mongodb: {
    uri: 'mongodb://localhost/codeoclock_test',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    }
  }
};
