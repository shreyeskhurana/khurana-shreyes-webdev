(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        /**
         * NOTE: I HAVE USED LECTURE's NAMING CONVENTION
         *      RATHER THAN THE ASSIGNMENT DOCUMENT'S.
         * Thanks!
         */

        var api = {
            findPagesForWebsite : findPagesForWebsite,
            findPageById : findPageById,
            createPage : createPage,
            updatePage : updatePage,
            removePage : removePage
        };
        return api;

        function findPagesForWebsite(uid, wid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page";
            return $http.get(url);
        }

        function createPage(page, uid, wid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page";
            return $http.post(url, page);
        }

        function findPageById(uid, wid, pid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid;
            return $http.get(url);
        }

        function updatePage(page, uid, wid, pid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid;
            return $http.put(url, page);
        }

        function removePage(uid, wid, pid) {
            var url = "/api/user/" + uid + "/website/" + wid + "/page/" + pid;
            return $http.delete(url);
        }
    }
})();