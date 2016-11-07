(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService, widget) {
        var vm = this;
        vm.flag = false;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        widget = widget.data;

        vm.widget = widget;
        vm.type = widget.widgetType.toLowerCase();

        /* function init() {
            WidgetService
                .findWidgetById(vm.userId, vm.websiteId, vm.pageId, vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                    vm.type = widget.widgetType.toLowerCase();
                    console.log(vm.widget);
                })
        }
        init(); */

        vm.updateWidget = updateWidget;
        vm.removeWidget = removeWidget;

        function updateWidget() {
            WidgetService
                .updateWidget(vm.widget, vm.userId, vm.websiteId, vm.pageId, vm.widgetId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function () {
                });
        }

        function removeWidget() {
            WidgetService
                .removeWidget(vm.userId, vm.websiteId, vm.pageId, vm.widgetId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function () {
                })
        }
    }
})();