const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    Lnum:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "log",
      required: true,
    },
    writer:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    Wdate:{
      type: Date,
      required: true,
    },
    contents:{
      type: String,
      required: true,
    }
});

module.exports = mongoose.model('comment', commentSchema);
