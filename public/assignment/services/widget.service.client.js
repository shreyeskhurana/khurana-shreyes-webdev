(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        /**
         * NOTE: I HAVE USED LECTURE's NAMING CONVENTION
         *      RATHER THAN THE ASSIGNMENT DOCUMENT'S.
         * Thanks!
         */

        var api = {
            findWidgetsForPage : findWidgetsForPage,
            createWidget : createWidget,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            removeWidget : removeWidget,
            getWidgetTypes : getWidgetTypes,
            sort : sort
        };
        return api;

        function findWidgetsForPage(uid, wid, pid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget";
            return $http.get(url);
        }

        function createWidget(widget, uid, wid, pid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget";
            return $http.post(url, widget);
        }

        function findWidgetById(uid, wid, pid, wgid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + wgid;
            return $http.get(url);
        }

        function updateWidget(widget, uid, wid, pid, wgid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + wgid;
            return $http.put(url, widget);
        }

        function removeWidget(uid, wid, pid, wgid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + wgid;
            return $http.delete(url);
        }

        function getWidgetTypes(uid, wid, pid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget-types";
            return $http.get(url);
        }

        function sort(start, end) {
            var url = "/api/sort?start=START&end=END";
            url = url
                .replace("START", start)
                .replace("END", end);

            $http.put(url);
        }
    }
})();