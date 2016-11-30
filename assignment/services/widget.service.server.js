module.exports = function (app, model) {
    // var widgets = [
    //     { _id: "123", widgetType: "HEADER", pageId: "321", size: 2,      text: "GIZMODO"},
    //     { _id: "234", widgetType: "HEADER", pageId: "321", size: 4,      text: "Lorem ipsum"},
    //     { _id: "345", widgetType: "IMAGE",  pageId: "321", width: "40%",  url: "http://lorempixel.com/400/200/"},
    //     { _id: "456", widgetType: "HTML",   pageId: "321",               text: "<p>Lorem ipsum</p>"},
    //     { _id: "567", widgetType: "HEADER", pageId: "321", size: 4,      text: "Lorem ipsum"},
    //     { _id: "678", widgetType: "YOUTUBE",pageId: "321", width: 560, height: 315,
    //         url: "https://youtu.be/AM2Ivdi9c4E" },
    //     { _id: "781", widgetType: "HTML",   pageId: "321", width: "40%", text: "<p>Lorem ipsum</p>"}
    // ];

    var widgetTypes = [
        {name: "Header", _id: "1"}, {name: "Html", _id: "2"}, {name: "Image", _id: "3"}, {name: "Input", _id: "4"},
        {name: "YouTube", _id: "5"}
    ];

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/upload'});
    var fs = require('fs');

    app.get("/api/user/:uid/website/:wid/page/:pid/widget", findWidgetsForPage);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget-types", getWidgetTypes);
    app.post("/api/user/:uid/website/:wid/page/:pid/widget", createWidget);
    app.get("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", findWidgetById);
    app.put("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", updateWidget);
    app.delete("/api/user/:uid/website/:wid/page/:pid/widget/:wgid", removeWidget);
    app.put("/api/sort", sortWidgets);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var pid = req.params.pid;
        var widget = req.body;

        model
            .widgetModel
            .createWidget(pid, widget)
            .then(
                function(widgetObj) {
                    res.send(widgetObj);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getWidgetTypes(req, res) {
        res.send(widgetTypes);
    }

    function findWidgetsForPage(req, res) {
        var pid = req.params.pid;
        model
            .widgetModel
            .findAllWidgetsForPage(pid)
            .then(
                function(page) {
                    if(page)
                        res.json(page.widgets);
                    else
                        res.send("0");
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;

        model
            .widgetModel
            .findWidgetById(wgid)
            .then(
                function (widgetObj) {
                    if(widgetObj)
                        res.send(widgetObj);
                    else
                        res.send("0");
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var wgid = req.params.wgid;

        model
            .widgetModel
            .updateWidget(wgid, widget)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function uploadImage(req, res) {
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var uid           = req.body.userId;
        var wid           = req.body.websiteId;
        var pid           = req.body.pageId;
        var wgid          = req.body.widgetId;

        var localUrl = '/assignment/upload/' + filename;

        model
            .widgetModel
            .uploadImage(wgid, localUrl)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );

        var url = '/assignment/index.html#/user/'+uid+'/website/'+wid+'/page/'+pid+'/widget/'+wgid;
        res.redirect(url);
    }

    function sortWidgets(req, res) {
        var start = req.query.start;
        var end = req.query.end;

        //widgets.splice(end, 0, widgets.splice(start, 1)[0]);

        res.sendStatus(200);
    }

    function removeWidget(req, res) {
        var pid = req.params.pid;
        var wgid = req.params.wgid;

        model
            .widgetModel
            .deleteWidget(pid, wgid)
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