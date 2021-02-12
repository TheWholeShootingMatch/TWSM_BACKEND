const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photographerSchema = new Schema({
    Uid:{
      type: String,
      required: true,
    },
    profile_img:{
      type: String,
    },
    Name:{
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    instagram:{
      type: String,
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

module.exports = mongoose.model('photographer', photographerSchema);
