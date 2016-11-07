(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.updatePage = updatePage;
        vm.removePage = removePage;

        function init() {
            PageService
                .findPagesForWebsite(vm.userId, vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {
                })

            PageService
                .findPageById(vm.userId, vm.websiteId, vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
                .error(function () {
                })
        }
        init();

        function updatePage(page) {
            PageService
                .updatePage(page, vm.userId, vm.websiteId, vm.pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {
                })
        }

        function removePage() {
            PageService
                .removePage(vm.userId, vm.websiteId, vm.pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {
                })
        }
    }
})();