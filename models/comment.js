const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    Lnum:{
      type: String,
      required: true,
    },
    id:{
      type: String,
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
