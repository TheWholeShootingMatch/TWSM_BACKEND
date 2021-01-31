const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

module.exports = () => {
  function connect() {
    mongoose.connect(process.env.DB_HOST, function(err) {
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
