(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: 'alice',    password: 'qwe',      first: 'Alice',   last: 'Wonderland'},
            {_id: "234", username: 'bob',      password: 'wer',      first: 'Bob',     last: 'Dylan'},
            {_id: "345", username: 'charlie',  password: 'ert',      first: 'Charlie', last: 'Brown'},
            {_id: "456", username: 'jannunzi', password: 'jannunzi', first: 'Jose',    last: 'Annunzi'}
        ];

        /**
         * NOTE: I HAVE USED LECTURE's NAMING CONVENTION
         *      RATHER THAN THE ASSIGNMENT DOCUMENT'S.
         * Thanks!
         */

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUsername: findUsername,
            addUser: addUser
        };
        return api;

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function findUserById(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    return user;
                }
            }
            return null;
        }

        function findUsername(username) {
            for(var u in users) {
                user = users[u];
                if(user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function addUser(newUser) {
            users.push(newUser);
        }
    }
})();