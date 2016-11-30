module.exports = function() {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        setModel: setModel,
        findWebsitesForUser: findWebsitesForUser,
        createWebsite: createWebsite,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        removeWebsite: removeWebsite
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsite(uid, website) {
        return WebsiteModel
            .create(website)
            .then(
                function (websiteObj) {
                    model.userModel
                        .findUserById(uid)
                        .then(
                            function (userObj) {
                                userObj.websites.push(websiteObj);
                                websiteObj._user = userObj._id;
                                websiteObj.save();
                                userObj.save();
                                return websiteObj;
                            },
                            function (error) {
                                return sendStatus(400).send(error);
                            }
                        );
                },
                function (error) {
                    return sendStatus(400).send(error);
                }
            );
    }

    function findWebsitesForUser(uid) {
        return model
            .userModel
            .findUserById(uid)
            .populate("websites")
            .exec();
    }

    function findWebsiteById(wid) {
        return WebsiteModel.findById(wid);
    }

    function updateWebsite(websiteId, website) {
        return WebsiteModel
            .update(
                {
                    _id: websiteId
                },
                {
                    name: website.name,
                    description: website.description
                }
            );
    }

    function removeWebsite(userId, websiteId) {
        return WebsiteModel
            .remove({
                _id: websiteId
            })
            .then(
                function (status) {
                    model.userModel
                        .findUserById(userId)
                        .then(
                            function (userObj) {
                                //userObj.websites.pop();
                                return userObj.save();
                            },
                            function (error) {
                                return sendStatus(400).send(error);
                            }
                        )
                },
                function (error) {
                    return sendStatus(400).send(error);
                }
            );
    }
};