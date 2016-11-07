(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            WidgetService
                .getWidgetTypes(vm.userId, vm.websiteId, vm.pageId)
                .success(function (widgetTypes) {
                    vm.widgetTypes = widgetTypes;
                })
                .error(function () {
                })
        }
        init();
    }
})();