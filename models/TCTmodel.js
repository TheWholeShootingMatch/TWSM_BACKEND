const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TCTmodelSchema = new Schema({
    TCTnum:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "tct",
      required: true,
    },
    Uid:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    }
});

module.exports = mongoose.model('TCTmodel', TCTmodelSchema);
