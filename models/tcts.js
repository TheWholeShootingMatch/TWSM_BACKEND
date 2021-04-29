const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TcTSchema = new Schema({
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    request_time: {
      type: Date,
      required: true
    },
    models: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "model"
    }],
    photographers : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "photographer"
    }],
    initMembers : [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
});

module.exports = mongoose.model("TCT", TcTSchema);
