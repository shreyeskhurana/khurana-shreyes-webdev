(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgType= $routeParams.type;
        var type = vm.wgType.toUpperCase();
        vm.widget = {wgType: type, text:"Default text"};

        vm.createWidget = createWidget;

        function createWidget() {
            vm.widget.widgetType = vm.wgType.toUpperCase();
            vm.widget._id = ((new Date()).getTime() % 1000).toString();
            vm.widget.pageId = vm.pid;

            WidgetService.createWidget(vm.widget);
            vm.widgets = WidgetService.widgets;

            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }
    }
})();