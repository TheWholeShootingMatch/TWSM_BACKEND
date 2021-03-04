const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const corllaborateProjectSchema = new Schema({
    id:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
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
    status:{
        type: Boolean,
        required: true
},
    location: {
        type: Number,
        required: true
    },
    Pdate: {
      type: Date,
      required: true,
    }
});

module.exports = mongoose.model('corllaborate_projects', corllaborateProjectSchema);
