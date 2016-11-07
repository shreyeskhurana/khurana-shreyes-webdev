(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        /**
         * NOTE: I HAVE USED LECTURE's NAMING CONVENTION
         *      RATHER THAN THE ASSIGNMENT DOCUMENT'S.
         * Thanks!
         */

        var api = {
            findWebsitesForUser : findWebsitesForUser,
            findWebsiteById : findWebsiteById,
            createWebsite : createWebsite,
            updateWebsite : updateWebsite,
            removeWebsite : removeWebsite
        };
        return api;

        function findWebsitesForUser(uid) {
            var url = "/api/user/" + uid + "/website";
            return $http.get(url);
        }

        function createWebsite(website, uid) {
            var url = "/api/user/" + uid + "/website";
            return $http.post(url, website);
        }

        function findWebsiteById(uid, wid) {
            var url = "/api/user/" + uid + "/website/" + wid;
            return $http.get(url);
        }

        function updateWebsite(website, uid, wid) {
            var url = "/api/user/" + uid + "/website/" + wid;
            return $http.put(url, website);
        }

        function removeWebsite(uid, wid) {
            var url = "/api/user/" + uid + "/website/" + wid;
            return $http.delete(url);
        }

    }
})();