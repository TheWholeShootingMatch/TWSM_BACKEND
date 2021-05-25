const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yjsTransaction = new Schema({
    docName: {
        type: String,
        required: true
    },
    docInfo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("yjs-transaction", yjsTransaction);
