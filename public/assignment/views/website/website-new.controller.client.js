(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function () {
                });
        }
        init();

        function createWebsite(website) {
            website._id = ((new Date()).getTime() % 1000).toString();
            website.uid = vm.userId;

            WebsiteService
                .createWebsite(website, vm.userId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                 })
        }
    }
})();