let express = require('express');
let adminRout = express();
let bodyParser = require('body-parser');
let path = require('path');
let hbs = require('hbs');
let session = require('express-session');
let mongoConnection = require('connect-mongodb-session')(session);
let adminController = require('../controller/admin.controller');

adminRout.set('view engine', 'hbs');
adminRout.set('views', path.join('../views/admin'));
adminRout.use(bodyParser.urlencoded({
    extended: true,
}))

let store = new mongoConnection({
    uri: 'mongodb+srv://tushar08:0805ritik@cluster0.xmjyqim.mongodb.net/agamiTech',
    collection: "adminSession"
})
adminRout.use(session({
    secret:"This is the secret",
    resave:false,
    saveUninitialized:false,
    store:store
}));

// admin Dashboard
adminRout.get('/admin',adminController.adminAuth, adminController.adminHome);

// admin signup
adminRout.get('/signup', adminController.signup);
adminRout.post('/signupPost', adminController.signupPost);

//admin login
adminRout.get('/login', adminController.login);
adminRout.post('/loginPost', adminController.loginPost);

// Add Staff
adminRout.get('/addStaff', adminController.adminAuth, adminController.addStaff);
adminRout.post('/addStaffPost',  adminController.addStaffPost);

// Add Routine of Staff
adminRout.get('/addRoutine',adminController.adminAuth, adminController.addRoutine);
adminRout.post('/addRoutinePost', adminController.addRoutinePost);

// Routine Dashboard
adminRout.get('/routineDash',adminController.adminAuth, adminController.routineDash);

// attendance dashboard
adminRout.get('/attendance',adminController.adminAuth, adminController.attendance);

// Change the status of the employee
adminRout.get('/changeStatus',adminController.adminAuth, adminController.changeStatus);
adminRout.post('/changePost', adminController.changePost);

// Logout
adminRout.get('/logout', adminController.logout);
module.exports = adminRout;