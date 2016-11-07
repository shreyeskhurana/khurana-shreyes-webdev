module.exports = function(app) {
    var pages = [
        { _id: "321", name: "Post 1", wid: "456" },
        { _id: "234", name: "Post 2", wid: "456" },
        { _id: "456", name: "Post 3", wid: "456" }
    ];

    app.get("/api/user/:uid/website/:wid/page", findPagesForUser);
    app.post("/api/user/:uid/website/:wid/page", createPage);
    app.get("/api/user/:uid/website/:wid/page/:pid", findPageById);
    app.put("/api/user/:uid/website/:wid/page/:pid", updatePage);
    app.delete("/api/user/:uid/website/:wid/page/:pid", removePage);

    function findPagesForUser(req, res) {
        var wid = req.params.wid;
        var result = [];

        for (var p in pages) {
            if (pages[p].wid === wid) {
                result.push(pages[p]);
            }
        }
        res.json(result);
    }

    function createPage(req, res) {
        var page = req.body;
        pages.push(page);

        res.sendStatus(200);
    }

    function findPageById(req, res) {
        var pid = req.params.pid;

        for(var p in pages) {
            if(pages[p]._id === pid) {
                res.json(pages[p]);
                return;
            }
        }

        res.send(null);
    }

    function updatePage(req, res) {
        var page = req.body;
        var pid = req.params.pid;

        for(var p in pages) {
            if(pages[p]._id === pid) {
                pages[p] = page;
                break;
            }
        }

        res.sendStatus(200);
    }

    function removePage(req, res) {
        var pid = req.params.pid;

        for(var p in pages) {
            if(pages[p]._id === pid) {
                pages.splice(p, 1);
                break;
            }
        }

        res.sendStatus(200);
    }
};