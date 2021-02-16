const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photographicAreaPSchema = new Schema({
    ciso:{
      type: String,
      required: true,
    },
    siso:{
      type: String,
      required: true,
    },
    Uid:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    name:{
      type: String,
      required: true,
    },
});

module.exports = mongoose.model('photographicAreaP', photographicAreaPSchema);
