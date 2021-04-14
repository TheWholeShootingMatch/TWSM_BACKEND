const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TCTmembersSchema = new Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    TcTnum: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "TCT",
        required: true
    }
});

module.exports = mongoose.model("TCTmembers", TCTmembersSchema);