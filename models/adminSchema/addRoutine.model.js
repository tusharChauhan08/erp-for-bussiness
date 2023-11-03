let mongoose = require('mongoose');

let routineSchema = new mongoose.Schema({
    Employee_Name:{type:String, required:true},
    Email_id:{type:String, required:true},
    Employee_id:{type:String, required:true},
    Work: {type:String, required:true},
    Start_Time: {type:String , required:true},
    End_Time: {type:String, required:true},
    Status: {type:String, default:"Pending", required:false},
})

let routineModel = new mongoose.model("routineModel", routineSchema,"EmployeeRoutine");
module.exports = routineModel;