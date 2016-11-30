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
            WebsiteService
                .findWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function () {
                });

            WebsiteService
                .findWebsiteById(vm.userId, vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                })
                .error(function () {
                });
        }
        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(website, vm.userId, vm.websiteId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {
                });
        }

        function removeWebsite() {
            WebsiteService
                .removeWebsite(vm.userId, vm.websiteId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {
                });
        }
    }
})();