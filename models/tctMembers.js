const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TCTmembersSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    TcTnum: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("TCTmembers", TCTmembersSchema);