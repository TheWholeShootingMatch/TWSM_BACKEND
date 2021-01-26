const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    TcTnum:{
        type: String,
        required: true,
    },
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    sendTime: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model("notifications", notificationSchema);