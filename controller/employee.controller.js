let staffModel = require('../models/adminSchema/addStaff.model');
let routineModel = require('../models/adminSchema/addRoutine.model');

// employee authentication middleware
let empAuth = async(req, res, next) => {
    if(req.session.empAuth){
        next();
    }
    else{
        res.redirect('/emplogin?=unAthorizedAttempt');
    }
}
// Staff Home
let userId = undefined;
let home = async(req, res) => {
    let query = {
        Employee_id: userId,
    }
    let result = await routineModel.find(query);
    res.render('empHome', {result});
}

// Staff Login 
let status = false;
let empLogin = async(req, res) => {
    res.render('empLogin',{status});
}
let empLoginPost = async(req, res) => {
    try{
        let {email, employeeId} = req.body;
        let data = {
            Email_id: email,
            Employee_id: employeeId,
        }
        let result = await staffModel.find(data);
        console.log(result);
        if(result == "" || result[0].Status == "Deactive" ){
            status = true;
            res.redirect("/empLogin?=ProfileDeactivateOrNotFound");
        }
        else{
            status = false;
            userId = result[0]._id;
            req.session.empAuth = true;
            res.redirect('/home?=successfully');
        }
    }
    catch(error){
        console.log(error);
        res.redirect('/empLogin?=ServerFail');
    }
}
//Mark Attendence 
let markAttendance = async(req, res) => {
    let query = {
        Employee_id: userId,
    } 
    let result = await routineModel.find(query);
    res.render('markAttendance',{result});
}
let markPost = async(req, res) => {
    try{
        let {work, attend} = req.body;
        let query = {
            Work: work,
        }
        let data = {
            $set:{
                Status: attend,
            }
        }
        await routineModel.updateMany(query, data)
        .then(() => {
            console.log("Successfully updated");
            res.redirect('/home?=sucess');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/markAttendence?=Failed');
        })
    }
    catch(error){
        console.log(error);
        res.redirect('/markAttendence?=ServerFail');
    }
}

// Logout 
let empLogout = async(req, res) => {
    req.session.destroy((err, data) => {
        if (err) throw err;
        res.redirect('/empLogin?=LogoutSuccessfully');
    })
}

module.exports = {
    home,
    empLogin,
    empLoginPost,
    empAuth,
    empLogout,
    markAttendance,
    markPost,
}