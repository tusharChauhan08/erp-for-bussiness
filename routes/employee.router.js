let express = require('express');
let empRout = express();
let bodyParser = require('body-parser');
let path = require('path');
let hbs = require('hbs');
let session = require('express-session');
let mongoConnection = require('connect-mongodb-session')(session);
let empController = require('../controller/employee.controller');

empRout.set('view engine', 'hbs');
empRout.set('views', path.join('../views/employee'));
empRout.use(bodyParser.urlencoded({
    extended: true,
}))

let store = new mongoConnection({
    uri: 'mongodb+srv://tushar08:0805ritik@cluster0.xmjyqim.mongodb.net/agamiTech',
    collection: "employeeSession"
})
empRout.use(session({
    secret:"This is the secret",
    resave:false,
    saveUninitialized:false,
    store:store
}));

empRout.get('/home',empController.empAuth, empController.home);
empRout.get('/empLogin', empController.empLogin);
empRout.post('/empLoginPost', empController.empLoginPost);
empRout.get('/markAttendance',empController.empAuth, empController.markAttendance);
empRout.post('/markPost', empController.markPost);
empRout.get('/empLogout', empController.empLogout);

module.exports = empRout;