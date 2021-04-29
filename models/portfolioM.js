const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photofolioMSchema = new Schema({
    link:{
      type: String,
      required: true,
    },
    id:{
      type: String,
      required: true,
    }
});

module.exports = mongoose.model('portfolioM', photofolioMSchema);
