const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
    TcTnum:{
        type: String,
        required: true,
    },
    id:{
        type: String,
        required: true,
    },
    Cnum:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    logdate:{
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('log', logSchema);
