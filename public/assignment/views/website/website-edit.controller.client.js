(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.updateWebsite = updateWebsite;
        vm.removeWebsite = removeWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(website);
            $location.url("/user/" + vm.userId + "/website");
        }

        function removeWebsite(wid) {
            WebsiteService.removeWebsite(wid);
            $location.url("/user/" + vm.userId + "/website");
        }
    }

})();