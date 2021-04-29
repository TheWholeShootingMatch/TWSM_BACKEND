const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    fav_models: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "model"
    }],
    fav_photographers: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "photographer"
    }],
    status: {
        type: Boolean
    }
});

module.exports = mongoose.model("User", userSchema);
