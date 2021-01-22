const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    link:{
      type: String,
      required: true,
    }
});

module.exports = mongoose.model('photo', photoSchema);
