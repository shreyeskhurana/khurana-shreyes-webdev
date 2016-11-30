module.exports = function() {

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var api = {
        setModel: setModel,
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function createPage(wid, page) {
        return PageModel
            .create(page)
            .then(
                function(pageObj) {
                    model
                        .websiteModel
                        .findWebsiteById(wid)
                        .then(
                            function (websiteObj) {
                                websiteObj.pages.push(pageObj);
                                pageObj._website = websiteObj._id;
                                pageObj.save();
                                websiteObj.save();
                                websiteObj.populate("pages", "name").exec();
                                return pageObj;
                            },
                            function (error) {
                                return sendStatus(400).send(error);
                            }
                        );
                },
                function(error) {
                    return sendStatus(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(wid) {
        return model
            .websiteModel
            .findWebsiteById(wid)
            .populate("pages")
            .exec();
    }

    function findPageById(pid) {
        return PageModel.findById(pid);
    }

    function updatePage(pageId, page) {
        return PageModel
            .update(
                {
                    _id: pageId
                },
                {
                    name: page.name,
                    description: page.description
                }
            );
    }

    function deletePage(websiteId, pageId) {
        return PageModel
            .remove({
                _id: pageId
            })
            .then(
                function(status) {
                    model
                        .websiteModel
                        .findWebsiteById(websiteId)
                        .then(
                            function(websiteObj) {
                                //websiteObj.pages.pop();
                                websiteObj.save();
                                return websiteObj;
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