let admin = require('../models/adminSchema/adminSign.model');
let bcrypt = require('bcryptjs');
let staffModel = require('../models/adminSchema/addStaff.model');
let routineModel = require('../models/adminSchema/addRoutine.model');

// Admin Middleware
let adminAuth = (req, res , next) => {
    if(req.session.adminAuth){
        next();
    }
    else{
        res.redirect('/login?=notAuthorized');
    }
}



// Admin Home
let adminHome = async(req, res) =>{
    let result = await staffModel.find({});
    res.render('adminHome',{result});
};


// Admin Signup
let signup = async(req, res) => {
   let result = await admin.find({});
   if(result == ""){
        res.render("adminSignup");
   }
   else{
        res.redirect('/admin?=adminAlreadyexist');
   }
};
let signupPost = async(req, res) => {
    try {
        let {name, email, password, mobile} = req.body;
        let encryptPassword = await bcrypt.hash(password, 12);
        let userdata = new admin({
            Name:name,
            Email_id:email,
            Mobile_no:mobile,
            Password:encryptPassword
        })
            await admin.insertMany([userdata]).then(()=>{
                console.log("data saved ");
                res.redirect('/login?=sucess');
            })
            .catch((err) => {
                console.log(err.message);
                res.redirect('/signup?=failed');
            })   
    } 
    catch (error) {
        console.log(error.message)
    }   
};

// Admin Login 
let login = async(req, res) => {
    res.render('adminLogin');
}
let loginPost = async(req, res) => {
    try{
        let {email, password} = req.body;
        let query = {
            Email_id:email
        }
        let result = await admin.find(query);
            if (result == "") {
                res.redirect('/signup?=userNotFound'); 
            }
            else{
                if(bcrypt.compareSync(password, result[0].Password)){
                    console.log('USer matches');
                    req.session.adminAuth = true;
                    res.redirect('/admin?=sucess');
                }
                else{
                    console.log('password mismatch');
                    res.redirect('/login?=passwordFailiure');
                }
            }
    }
    catch(error){
        console.log(error.message);
    }
}

// adding Staff
let addStaff = async(req, res) => {
    res.render('addStaff');
};
let addStaffPost = async(req, res) => {
    try{
        let {name, email, mobile, employeId, status} = req.body;
        let data = new staffModel({
            Employee_Name: name,
            Email_id: email,
            Mobile_no: mobile,
            Employee_id: employeId,
            Status: status
        });
        let query = {
            Email_id: email
        }
        let result = await staffModel.find(query);
        if(result == ""){
            await staffModel.insertMany([data])
            .then(() => {
                console.log('staff sucessfully inserted');
                res.redirect('/addStaff?=sucess');
            })
            .catch((err) => {
                console.log(err);
                res.redirect('/addStaff?=someErrorFail');
            })
        }
        else{
            res.redirect("/addStaff?=alreadyAdded");
        }
    }
    catch(error){
        console.log(error.message);
        res.redirect("/addStaff?=serverFail");
    }
}

// Add Routine
let addRoutine = async(req, res) => {
    let result = await staffModel.find({});
    res.render('addRoutine',{result});
}
let addRoutinePost = async(req, res) => {
    try{
        let {name, email, work, startTime, endTime} = req.body;
        let query = {
            Email_id: email,
        }
        let result = await staffModel.find(query);
        console.log(result[0]._id)
        let data = new routineModel({
            Employee_Name: name,
            Email_id: email,
            Employee_id: result[0]._id,
            Work: work,
            Start_Time: startTime,
            End_Time: endTime
        })
        await routineModel.insertMany([data])
        .then(() =>{
            console.log("Data is inserted successfully.");
            res.redirect("/addRoutine?=success");
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/addRoutine?=failed");
        })
    }
    catch(error){
        console.log(error);
        res.redirect('/addRoutine?=ServerFail');
    }
}

// Routine Dashboard 
let routineDash = async(req, res) => {
    let result = await routineModel.find({});
    res.render('routineDash',{result});
}

// update the status of the employee
let changeStatus = async(req, res) => {
    res.render('changeStatus');
}
let changePost = async(req, res) => {
    try{
        let {email, status} = req.body;
        let query = {
            Email_id: email,
        }
        let data = {
            $set:{
                Status: status,
            }
        }
        await staffModel.updateOne(query, data)
        .then(() => {
            console.log("Update successful");
            res.redirect('/changeStatus?=Success');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/changeStatus?=Error');
        })
    }
    catch(error){
        console.log(error);
        res.redirect('/changeStatus?=serverFail');
    }
}

// attendance dashboard
let attendance = async(req, res) => {
    let result = await routineModel.find({});
    res.render('attendance',{result});
}

// Logout
let logout = async(req, res, next) => {
    req.session.destroy((err, data) => {
        if (err) throw err;
        res.redirect('/login?=LogoutSucessfully'); 
    })
}

module.exports = {
    adminHome,
    signup,
    signupPost,
    login,
    loginPost,
    addStaff,
    addStaffPost,
    addRoutine,
    addRoutinePost,
    routineDash,
    adminAuth,
    changeStatus, 
    changePost,
    attendance,
    logout,
};