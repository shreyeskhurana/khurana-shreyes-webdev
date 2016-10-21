(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
                { _id: "321", name: "Post 1", wid: "456" },
                { _id: "234", name: "Post 2", wid: "456" },
                { _id: "456", name: "Post 3", wid: "456" }
        ];

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

        function findPagesForWebsite(wid) {
            var result = [];
            for(var p in pages) {
                if(pages[p].wid === wid) {
                    result.push(pages[p]);
                }
            }
            return result;
        }

        /*function findWebsitesForUser(uid) {
            http.get("/websites");
        }*/

        function findPageById(pid) {
            for(var p in pages) {
                if(pages[p]._id === pid) {
                    return pages[p];
                }
            }
            return null;
        }

        function createPage(page) {
            pages.push(page);
        }

        function updatePage(page) {
            for(var p in pages) {
                if(pages[p]._id === page._id) {
                    pages[p] = page;
                }
            }
        }

        function removePage(pid) {
            for(var p in pages) {
                if(pages[p]._id === pid) {
                    pages.splice(p, 1);
                }
            }
        }
    }
})();