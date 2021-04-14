const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TCTversionsSchema = new Schema({
    TcTnum: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "TCT",
        required: true
    },
    docName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("TCTversions", TCTversionsSchema);