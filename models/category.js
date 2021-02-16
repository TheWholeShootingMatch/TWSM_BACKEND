const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    TcTnum:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "tct",
      required: true,
    },
    category:{
      type: String,
      required: true,
    }
});

module.exports = mongoose.model('category', categorySchema);
