(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

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
    }
})();