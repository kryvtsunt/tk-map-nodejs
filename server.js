var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');


// const URL = 'mongodb://localhost/tk-map'
const URL = 'mongodb://admin:admin42@ds147011.mlab.com:47011/heroku_mqnllqnv';
mongoose.connect(URL);

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin",
//         "https://tk-map-angular.herokuapp.com");
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });


var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


var userService = require('./services/user.service.server');
userService(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function(){
    console.log("Our app is running on port" + PORT)
})