(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
                { _id: "123", name: "Facebook",    uid: "456" },
                { _id: "234", name: "Tweeter",     uid: "456" },
                { _id: "456", name: "Gizmodo",     uid: "456" },
                { _id: "567", name: "Tic Tac Toe", uid: "123" },
                { _id: "678", name: "Checkers",    uid: "123" },
                { _id: "789", name: "Chess",       uid: "234" }
        ];

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
            var result = [];
            for(var w in websites) {
                if(websites[w].uid === uid) {
                    result.push(websites[w]);
                }
            }
            return result;
        }

        /*function findWebsitesForUser(uid) {
            http.get("/websites");
        }*/

        function findWebsiteById(wid) {
            for(var w in websites) {
                if(websites[w]._id === wid) {
                    return websites[w];
                }
            }
            return null;
        }

        function createWebsite(website) {
            websites.push(website);
        }

        function updateWebsite(website) {
            for(var w in websites) {
                if(websites[w]._id === website._id) {
                    websites[w] = website;
                }
            }
        }


        function removeWebsite(wid) {
            for(var w in websites) {
                if(websites[w]._id === wid) {
                    websites.splice(w, 1);
                }
            }
        }

    }
})();