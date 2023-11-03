let mongoose = require('mongoose');

let adminSignup = new mongoose.Schema({
    Name: {type: String, required: true},
    Email_id: {type: String, required: true},
    Mobile_no: {type: String, required: true},
    Password: {type: String, required: true},
});

let admin = new mongoose.model("admin", adminSignup, "Admin");
module.exports = admin;