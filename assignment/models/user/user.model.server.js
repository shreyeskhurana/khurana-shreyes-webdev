module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        setModel: setModel,
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        findUserByUsername: findUserByUsername,
        findWebsitesForUser: findWebsitesForUser,
        removeUser: removeUser,
        updateUser: updateUser
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        return UserModel.create(user);
    }
    
    function findUserByGoogleId(googleId) {
        return UserModel
            .findOne({
                "google.id": googleId
            });
    }

    function findUserByFacebookId(facebookId) {
        return UserModel
            .findOne({'facebook.id': facebookId});
    }

    function findUserByUsername(username) {
        return UserModel
            .findOne({
                username: username
            });
    }

    function findUserByCredentials(username, password) {
        return UserModel
            .findOne({
                username: username,
                password: password
            });
    }

    function findUserById(userId) {
        //return UserModel.find({_id: userId}); -> returns an array
        return UserModel.findById(userId);
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    first: user.first,
                    last: user.last,
                    email: user.email,
                    phone: user.phone
                }
            );
    }

    function removeUser(userId) {
        return UserModel
            .remove({
                _id: userId
            });
    }

    function findWebsitesForUser(userId) {
        return UserModel
            .findById(userId)
            .then(function (user) {
                return user.populate("websites", "name").exec(); //HYDRATION!!!!!!
            });
    }
};