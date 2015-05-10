module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URL,
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    }
  }
};
