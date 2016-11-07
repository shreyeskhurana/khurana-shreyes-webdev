module.exports = function(app) {
    var websites = [
        { _id: "123", name: "Facebook",    uid: "456" },
        { _id: "234", name: "Tweeter",     uid: "456" },
        { _id: "456", name: "Gizmodo",     uid: "456" },
        { _id: "567", name: "Tic Tac Toe", uid: "123" },
        { _id: "678", name: "Checkers",    uid: "123" },
        { _id: "789", name: "Chess",       uid: "234" }
    ];

    app.get("/api/user/:uid/website", findWebsitesForUser);
    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website/:wid", findWebsiteById);
    app.put("/api/user/:uid/website/:wid", updateWebsite);
    app.delete("/api/user/:uid/website/:wid", removeWebsite);

    function findWebsitesForUser(req, res) {
        var uid = req.params.uid;
        var result = [];

        for (var w in websites) {
            if (websites[w].uid === uid) {
                result.push(websites[w]);
            }
        }
        res.json(result);
    }

    function createWebsite(req, res) {
        var website = req.body;
        websites.push(website);

        res.sendStatus(200);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;

        for(var w in websites) {
            if(websites[w]._id === wid) {
                res.json(websites[w]);
                return;
            }
        }

        res.send(null);
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var wid = req.params.wid;

        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites[w] = website;
                break;
            }
        }

        res.sendStatus(200);
    }

    function removeWebsite(req, res) {
        var wid = req.params.wid;

        for(var w in websites) {
            if(websites[w]._id === wid) {
                websites.splice(w, 1);
            }
        }

        res.sendStatus(200);
    }
};