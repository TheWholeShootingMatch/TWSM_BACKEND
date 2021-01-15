const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    TCTnum:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('category', categorySchema);