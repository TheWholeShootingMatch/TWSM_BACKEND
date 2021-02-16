const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    Uid:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    profile_img:{
      type: String,
    },
    Name:{
      type: String,
      required: true,
    },
    Age:{
      type: Number,
      required: true,
    },
    Gender:{
      type: String,
      required: true,
    },
    height:{
      type: Number,
      required: true,
    },
    Busto:{
      type: Number,
      required: true,
    },
    Quadril:{
      type: Number,
      required: true,
    },
    Cintura:{
      type: Number,
      required: true,
    },
    instagram:{
      type: String,
    },
    email:{
      type: String,
      required: true,
    },
    self_introduction:{
      type: String,
      required: true,
    },
    career:{
      type: String,
      required: true,
    },
    language:{
      type: String,
      required: true,
    }
});

module.exports = mongoose.model('model', modelSchema);
