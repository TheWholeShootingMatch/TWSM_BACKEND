const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    Lnum:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "log",
      required: true,
    },
    id:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    Cdate:{
      type: Date,
      required: true,
    },
    contents:{
      type: String,
      required: true,
    }
});

module.exports = mongoose.model('comment', commentSchema);
