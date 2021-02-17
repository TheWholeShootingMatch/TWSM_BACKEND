const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
    TcTnum:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "TCT",
      required: true,
    },
    writer:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category:{
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
