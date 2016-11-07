(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        /**
         * NOTE: I HAVE USED LECTURE's NAMING CONVENTION
         *      RATHER THAN THE ASSIGNMENT DOCUMENT'S.
         * Thanks!
         */

        var api = {
            findUserByCredentials : findUserByCredentials,
            findUserById : findUserById,
            findUsername : findUsername,
            createUser : createUser,
            updateUser : updateUser,
            unregisterUser : unregisterUser
        };
        return api;

        function findUserByCredentials(username, password) {
            /*for(var u in users) {
                user = users[u];
                if(user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;*/
            var url = '/api/user?username=' + username + '&password=' + password;
            return $http.get(url);
        }

        function findUsername(username) {
            /*for(var u in users) {
             user = users[u];
             if(user.username === username) {
             return user;
             }
             }
             return null;*/
            var url = '/api/user?username=' + username;
            return $http.get(url);
        }

        function createUser(newUser) {
            /*users.push(newUser);
            */
            var url = '/api/user/';
            return $http.post(url, newUser);
        }

        function findUserById(uid) {
            var url = '/api/user/' + uid;
            return $http.get(url);
        }

        function updateUser(user, uid) {
            var url = '/api/user/' + uid;
            $http.put(url, user);
        }

        function unregisterUser(uid) {
            var url = '/api/user/' + uid;
            return $http.delete(url);
        }
    }
})();