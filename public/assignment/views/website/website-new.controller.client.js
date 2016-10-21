(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(vm.userId);
        }
        init();

        function createWebsite(website) {
            website._id = ((new Date()).getTime() % 1000).toString();
            website.uid = vm.userId;
            console.log(website);

            WebsiteService.createWebsite(website);
            vm.websites = WebsiteService.websites;

            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();