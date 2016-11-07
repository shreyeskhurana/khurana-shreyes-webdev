module.exports = function (app) {
    var widgets = [
        { _id: "123", widgetType: "HEADER", pageId: "321", size: 2,      text: "GIZMODO"},
        { _id: "234", widgetType: "HEADER", pageId: "321", size: 4,      text: "Lorem ipsum"},
        { _id: "345", widgetType: "IMAGE",  pageId: "321", width: "40%",  url: "http://lorempixel.com/400/200/"},
        { _id: "456", widgetType: "HTML",   pageId: "321",               text: "<p>Lorem ipsum</p>"},
        { _id: "567", widgetType: "HEADER", pageId: "321", size: 4,      text: "Lorem ipsum"},
        { _id: "678", widgetType: "YOUTUBE",pageId: "321", width: 560, height: 315,
            url: "https://youtu.be/AM2Ivdi9c4E" },
        { _id: "781", widgetType: "HTML",   pageId: "321", width: "40%", text: "<p>Lorem ipsum</p>"}
    ]

    var widgetTypes = [
        {name: "Header", _id: "1"}, {name: "Html", _id: "2"}, {name: "Image", _id: "3"}, {name: "YouTube", _id: "4"}
    ]

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/assignment/upload' });
    var fs = require('fs');

    app.get("/api/user/:uid/website/:wid/page/:pid/widget", findWidgetsForPage);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget-types", getWidgetTypes);
    app.post("/api/user/:uid/website/:wid/page/:pid/widget", createWidget);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", findWidgetById);
    app.put("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", updateWidget);
    app.delete("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", removeWidget);
    app.put("/api/sort", sortWidgets);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function findWidgetsForPage(req, res) {
        res.send(widgets);
        /*var pid = req.params.pid;
        var result = [];

        for (var wg in widgets) {
            if (widgets[wg].pageId === pid) {
                result.push(widgets[wg]);
            }
        }
        res.json(result);*/
    }

    function getWidgetTypes(req, res) {
        res.send(widgetTypes);
    }

    function createWidget(req, res) {
        var widget = req.body;
        widgets.push(widget);

        res.sendStatus(200);
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;

        for(var wg in widgets) {
            if(widgets[wg]._id === wgid) {
                res.json(widgets[wg]);
                return;
            }
        }

        res.send(null);
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = req.params.wgid;

        for(var wg in widgets) {
            if(widgets[wg]._id === wgid) {
                widgets[wg] = widget;
                break;
            }
        }

        res.sendStatus(200);
    }

    function removeWidget(req, res) {
        var wgid = req.params.wgid;

        for(var wg in widgets) {
            if(widgets[wg]._id === wgid) {
                widgets.splice(wg, 1);
                break;
            }
        }

        res.sendStatus(200);
    }

    function sortWidgets(req, res) {
        var start = req.query.start;
        var end = req.query.end;

        widgets.splice(end, 0, widgets.splice(start, 1)[0]);

        res.sendStatus(200);
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var imageFile = req.file;

        for (var wg in widgets) {
            if (widgets[wg]._id === widgetId) {
                widgets[wg].url = '/assignment/upload/' + filename;
                break;
            }
        }

        var url = '/assignment/index.html#/user/'+userId+'/website/'+websiteId+'/page/'+pageId+'/widget/'+widgetId;
        res.redirect(url);
    }
}