var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    markers: Array
}, {collection: 'user'});

module.exports = userSchema;