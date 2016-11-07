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

        var type = vm.wgType.toUpperCase();
        vm.widget = {wgType: type, text:"Default text"};

        vm.createWidget = createWidget;

        function createWidget() {
            vm.widget.widgetType = vm.wgType.toUpperCase();
            vm.widget._id = ((new Date()).getTime() % 1000).toString();
            vm.widget.pageId = vm.pid;

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