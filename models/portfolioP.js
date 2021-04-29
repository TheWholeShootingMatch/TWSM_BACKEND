const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photofolioPSchema = new Schema({
    link:{
      type: String,
      required: true,
    },
    id:{
      type: String,
      required: true,
    }
});

module.exports = mongoose.model('portfolioP', photofolioPSchema);
