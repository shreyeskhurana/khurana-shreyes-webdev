(function () {
    angular
        .module("utilities", [])
        .directive("sortable", sortable)
        .directive("ngEnter", ngEnter);

    function sortable() {
        function  linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element
                .sortable({
                    start: function(event, ui) {
                        start = $(ui.item).index();
                    },
                    stop: function(event, ui) {
                        end = $(ui.item).index();
                        scope.sortableController.sort(start, end);
                    }
                });
        }

        return {
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }

    function sortableController(WidgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(start, end) {
            WidgetService.sort(start, end);
        }
    }

    function ngEnter() {
        function  linker(scope, element, attributes) {
            element.bind('keydown keypress', function (event) {
                if(event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attributes.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        }

        return {
            link: linker
        }
    }
})();