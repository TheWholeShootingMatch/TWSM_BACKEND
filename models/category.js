const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    TcTnum:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "TCT",
      required: true,
    },
    name:{
      type: String,
      required: true,
    }
});

module.exports = mongoose.model('category', categorySchema);
