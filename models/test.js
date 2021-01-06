const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
    feild1:{
        type: String,
        required: true,
    },
    feild2:{
        type: String,
        required: true,
    }
});


testSchema.statics.findAll = function () {
    return this.find({});
};
  
module.exports = mongoose.model('test', testSchema, 'test');