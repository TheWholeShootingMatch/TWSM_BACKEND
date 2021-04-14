const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const corllaborateProjectSchema = new Schema({
    id:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    status:{
      type: String,
      required: true
    },
    title:{
      type: String,
      required: true,
    },
    corporation_name:{
      type: String,
      required: true,
    },
    about_project:{
      type: String,
      required: true,
    },
    location: {
        type: String,
        required: true
    },
    Pdate: {
      type: Date,
      required: true,
    },
    model: {
      type: Boolean,
      required: true,
    },
    photographer: {
      type: Boolean,
      required: true,
    },
    gender: {
      type: String,
    },
    age_min: {
      type: Number,
    },
    age_max: {
      type: Number,
    },
    height_min: {
      type: Number,
    },
    height_max: {
      type: Number,
    },
    weight_min: {
      type: Number,
    },
    weight_max: {
      type: Number,
    },
    busto_min: {
      type: Number,
    },
    busto_max: {
      type: Number,
    },
    quadril_min: {
      type: Number,
    },
    quadril_max: {
      type: Number,
    },
    cintura_min: {
      type: Number,
    },
    cintura_max: {
      type: Number,
    },
    ethnicity: {
      type: String,
    },
    eye_color: {
      type: String,
    },
    hair_color: {
      type: String,
    },
    model_field: {
      type: String,
    },
    model_detail: {
      type: String,
    },
    photographer_field: {
      type: String,
    },
    retouch: {
      type: String,
    },
    photographer_detail: {
      type: String,
    }
});

module.exports = mongoose.model('corllaborate_projects', corllaborateProjectSchema);
