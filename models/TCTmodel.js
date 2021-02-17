const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TCTmodelSchema = new Schema({
    TCTnum:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "TCT",
      required: true,
    },
    Uid:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    }
});

module.exports = mongoose.model('TCTmodel', TCTmodelSchema);
