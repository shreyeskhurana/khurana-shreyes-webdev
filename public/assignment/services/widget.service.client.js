(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { _id: "123", widgetType: "HEADER", pageId: "321", size: 2,      text: "GIZMODO"},
            { _id: "234", widgetType: "HEADER", pageId: "321", size: 4,      text: "Lorem ipsum"},
            { _id: "345", widgetType: "IMAGE",  pageId: "321", width: "100%", url: "http://lorempixel.com/400/200/"},
            { _id: "456", widgetType: "HTML",   pageId: "321",               text: "<p>Lorem ipsum</p>"},
            { _id: "567", widgetType: "HEADER", pageId: "321", size: 4,      text: "Lorem ipsum"},
            { _id: "678", widgetType: "YOUTUBE",pageId: "321", width: "100%", url: "https://youtu.be/AM2Ivdi9c4E" },
            { _id: "789", widgetType: "HTML",   pageId: "321",               text: "<p>Lorem ipsum</p>"}
        ]

        /**
         * NOTE: I HAVE USED LECTURE's NAMING CONVENTION
         *      RATHER THAN THE ASSIGNMENT DOCUMENT'S.
         * Thanks!
         */

        var api = {
            findWidgetsForPage : findWidgetsForPage,
            findWidgetById : findWidgetById,
            createWidget : createWidget,
            updateWidget : updateWidget,
            removeWidget : removeWidget
        };
        return api;

        function findWidgetsForPage(pid) {
            return widgets;
        }

        function findWidgetById(wgid) {
            for(var w in widgets) {
                if(widgets[w]._id == wgid) {
                    return widgets[w];
                }
            }
            return null;
        }

        function createWidget(widget) {
            widgets.push(widget);
        }

        function updateWidget(widget) {
            for(var w in widgets) {
                if(widgets[w]._id === widget._id) {
                    widgets[p] = widget;
                }
            }
        }

        function removeWidget(wgid) {
            for(var w in widgets) {
                if(widgets[w]._id == wgid) {
                    widgets.splice(w, 1);
                }
            }
            return null;
        }
    }
})();