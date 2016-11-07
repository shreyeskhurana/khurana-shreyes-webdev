(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        vm.createPage = createPage;

        function init() {
            PageService
                .findPagesForWebsite(vm.userId, vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {
                })
        }
        init();

        function createPage(page) {
            page._id = ((new Date()).getTime() % 1000).toString();
            page.wid = vm.websiteId;

            PageService
                .createPage(page, vm.userId, vm.websiteId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {
                });
        }
    }
})();