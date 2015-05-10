module.exports = {
  mongodb: {
    uri: 'mongodb://localhost/codeoclock',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    }
  }
};
