const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whiteboardSchema = new Schema({
  TCTnum:{
    type: String,
    required: true,
  },
  Sname:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Whiteboard", whiteboardSchema);
