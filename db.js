const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

module.exports = () => {
  dotenv.config()
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
