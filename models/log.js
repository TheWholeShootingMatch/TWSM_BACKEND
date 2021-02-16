const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var category = require('./category');

const logSchema = new Schema({
    TcTnum:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "tct",
      required: true,
    },
    id:{
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    Cnum:{
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    title:{
      type: String,
      required: true,
    },
    contents:{
      type: String,
      required: true,
    },
    logdate:{
      type: Date,
      required: true,
    }
});

module.exports = mongoose.model('log', logSchema);
