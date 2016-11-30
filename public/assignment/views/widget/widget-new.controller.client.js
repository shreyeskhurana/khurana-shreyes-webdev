(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.flag = true;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.wgType= $routeParams.type.toLowerCase();

        vm.widget = {name: "Default text", type: vm.wgType.toUpperCase()};

        vm.createWidget = createWidget;

        function createWidget() {
            WidgetService
                .createWidget(vm.widget, vm.userId, vm.websiteId, vm.pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function () {
                });
        }
    }
})();