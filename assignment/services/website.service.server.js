module.exports = function(app, model) {
    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findWebsitesForUser);
    app.get("/api/user/:uid/website/:wid", findWebsiteById);
    app.put("/api/user/:uid/website/:wid", updateWebsite);
    app.delete("/api/user/:uid/website/:wid", removeWebsite);

    function createWebsite(req, res) {
        var uid = req.params.uid;
        var website = req.body;

        model
            .websiteModel
            .createWebsite(uid, website)
            .then(
                function(website) {
                    res.send(website);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWebsitesForUser(req, res) {
        var uid = req.params.uid;
        model
            .websiteModel
            .findWebsitesForUser(uid)
            .then(
                function (user) {
                    if(user)
                        res.json(user.websites);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;

        model
            .websiteModel
            .findWebsiteById(wid)
            .then(
                function (website) {
                    if(website)
                        res.send(website);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = req.params.wid;

        model
            .websiteModel
            .updateWebsite(wid, website)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function removeWebsite(req, res) {
        var uid = req.params.uid;
        var wid = req.params.wid;

        model
            .websiteModel
            .removeWebsite(uid, wid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};