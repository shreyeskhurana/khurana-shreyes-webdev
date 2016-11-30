module.exports = function() {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        setModel: setModel,
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        uploadImage: uploadImage,
        deleteWidget: deleteWidget
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWidget(pid, widget) {
        return WidgetModel
            .create(widget)
            .then(
                function(widgetObj) {
                    model
                        .pageModel
                        .findPageById(pid)
                        .then(
                            function(pageObj) {
                                pageObj.widgets.push(widgetObj);
                                widgetObj._page = pageObj._id;
                                widgetObj.save();
                                pageObj.save();
                                return widgetObj;
                            },
                            function(error) {
                                return sendStatus(400).send(error);
                            }
                        );
                },
                function(error) {
                    return sendStatus(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(pid) {
        return model
            .pageModel
            .findPageById(pid)
            .populate("widgets")
            .exec();
    }

    function findWidgetById(wgid) {
        return WidgetModel.findById(wgid);
    }

    function updateWidget(wgid, widget) {
        switch (widget.type) {
            case "HEADER": {
                return WidgetModel
                    .update(
                        {
                            _id: wgid
                        },
                        {
                            name: widget.name,
                            description: widget.description,
                            size: widget.size
                        }
                    );
            }
            case "HTML": {
                return WidgetModel
                    .update(
                        {
                            _id: wgid
                        },
                        {
                            text: widget.text
                        }
                    );
            }
            case "IMAGE": {
                return WidgetModel
                    .update(
                        {
                            _id: wgid
                        },
                        {
                            description: widget.description,
                            url: widget.url,
                            width: widget.width
                        }
                    );
            }
            case "YOUTUBE" : {
                return WidgetModel
                    .update(
                        {
                            _id: wgid
                        },
                        {
                            description: widget.description,
                            url: widget.url,
                            width: widget.width,
                            height: widget.height
                        }
                    );
            }
            case "INPUT" : {
                return WidgetModel
                    .update(
                        {
                            _id: wgid
                        },
                        {
                            text: widget.text,
                            rows: widget.rows,
                            placeholder: widget.placeholder,
                            formatted: widget.formatted
                        }
                    );
            }
            default : return WidgetModel;
        }
    }

    function deleteWidget(pid, wgid) {
        return WidgetModel
            .remove({
                _id: wgid
            })
            .then(
                function(status) {
                    model
                        .pageModel
                        .findPageById(pid)
                        .then(
                            function(pageObj) {
                                //websiteObj.pages.pop();
                                pageObj.save();
                                return pageObj;
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

    function uploadImage(wgid, localUrl) {
        return WidgetModel
            .update(
                {
                    _id: wgid
                },
                {
                    url: localUrl
                }
            );
    }

    function reorderWidget(pageId, start, end) {
    }
};