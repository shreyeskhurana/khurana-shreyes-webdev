module.exports = function(app, model) {
    app.get("/api/user/:uid/website/:wid/page", findPagesForUser);
    app.post("/api/user/:uid/website/:wid/page", createPage);
    app.get("/api/user/:uid/website/:wid/page/:pid", findPageById);
    app.put("/api/user/:uid/website/:wid/page/:pid", updatePage);
    app.delete("/api/user/:uid/website/:wid/page/:pid", deletePage);

    function createPage(req, res) {
        var wid = req.params.wid;
        var page = req.body;

        model
            .pageModel
            .createPage(wid, page)
            .then(
                function(page) {
                    res.send(page);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPagesForUser(req, res) {
        var wid = req.params.wid;
        model
            .pageModel
            .findAllPagesForWebsite(wid)
            .then(
                function(website) {
                    if(website)
                        res.json(website.pages);
                    else
                        res.send("0");
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pid = req.params.pid;

        model
            .pageModel
            .findPageById(pid)
            .then(
                function (page) {
                    if(page)
                        res.send(page);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var page = req.body;
        var pid = req.params.pid;

        model
            .pageModel
            .updatePage(pid, page)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req, res) {
        var wid = req.params.wid;
        var pid = req.params.pid;

        model
            .pageModel
            .deletePage(wid, pid)
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