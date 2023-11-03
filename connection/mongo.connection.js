let mongoose = require('mongoose');
let connection = mongoose.connect('mongodb+srv://tushar08:0805ritik@cluster0.xmjyqim.mongodb.net/agamiTech')
.then(() => {
    console.log("Connection is successfully established");
})
.catch((err) => {
    console.log(err);
});

module.exports = connection;