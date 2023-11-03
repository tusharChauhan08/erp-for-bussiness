let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let hbs = require('hbs');
let connection = require('../connection/mongo.connection');
let adminRout = require('../routes/admin.router');
let empRout = require('../routes/employee.router');

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(express.static(path.join("../public")));

app.use('/', adminRout);
app.use('/', empRout);
app.listen("5000");
console.log('Server is started at the port 5000...');
