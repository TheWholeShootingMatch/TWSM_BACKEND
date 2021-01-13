const mongoose = require('mongoose');
module.exports = () => {
  function connect() {
    mongoose.connect('mongodb://13.124.192.207:27017/database', function(err) {
      if (err) {
        console.error('mongodb connection error', err);
      }
      else{
        console.log('mongodb connected');
      }
    });
  }
  connect();
  mongoose.connection.on('disconnected', connect);
};
