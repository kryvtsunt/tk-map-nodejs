module.exports = function (app) {

    app.get('/api/user/username/:userName', findUserByUsername);
    app.post('/api/register', register);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.get('/api/status', checkStatus);
    app.get('/api/user', profile);
    app.put('/api/user', updateUser);


    var userModel = require('../models/user/user.model.server');

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function (user) {
                if (user !== null) {
                    req.session['currentUser'] = user;
                }
                res.json(user);
            })
    }

    function checkStatus(req, res) {
        if (req.session['currentUser']) {
            res.json(true)
        }
        else res.json(false)
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }


    function logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var u = req.session['currentUser']
        var id = u._id
        userModel.updateUser(id, user)
            .then(function () {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }


    function findUserByUsername(req, res) {
        var userName = req.params['userName'];
        userModel.findUserByUsername(userName)
            .then(function (user) {
                res.json(user);
            })
    }


    function register(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }


}
