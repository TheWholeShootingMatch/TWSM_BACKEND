const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TcTSchema = new Schema({
    owner: {
        type: String,
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
        type: String,
        required: true
    }
});

module.exports = mongoose.model("TCTs", TcTSchema);