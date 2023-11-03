let mongoose = require('mongoose');

let staffSchema = new mongoose.Schema({
    Employee_Name: {type: String, required: true},
    Email_id:{type: String, required: true},
    Mobile_no:{type: String, required: true},
    Employee_id:{type: String, required: true},
    Status:{type: String, required: true}
});

let staffModel = new mongoose.model('staffModel', staffSchema, "StaffDetails");
module.exports = staffModel;