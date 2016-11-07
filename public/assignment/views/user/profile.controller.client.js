(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams.uid;

        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;

        function init() {
            UserService
                .findUserById(userId)
                .success(function(user) {
                    if(user != "0") {
                        vm.user = user;
                    }
                })
                .error(function(error) {
                });
        }
        init();

        function updateUser() {
            UserService
                .updateUser(vm.user, userId);
        }

        function unregisterUser() {
            UserService
                .unregisterUser(userId)
                .success(function() {
                    $location.url("/login")
                })
                .error(function(error) {
                });
        }
    }
})();