var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function createUser(user) {
    if (user.img_path === '' || user.img_path === undefined) {
        user.img_path = "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100"
    }
    if (user.role === '' || user.role === undefined) {
        user.role = 'user';
    }
    return userModel.create(user);
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {
        $set: {
            'markers': user.markers
        },
    })
}


var api = {
    createUser: createUser,

    findUserByCredentials: findUserByCredentials,

    findUserByUsername: findUserByUsername,

    updateUser: updateUser

};

module.exports = api;