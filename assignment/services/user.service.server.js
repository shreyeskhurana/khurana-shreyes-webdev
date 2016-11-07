module.exports = function(app) {
    var users = [
        {_id: "123", username: 'alice',    password: 'qwe',      first: 'Alice',   last: 'Wonderland'},
        {_id: "234", username: 'bob',      password: 'wer',      first: 'Bob',     last: 'Dylan'},
        {_id: "345", username: 'charlie',  password: 'ert',      first: 'Charlie', last: 'Brown'},
        {_id: "456", username: 'jannunzi', password: 'jannunzi', first: 'Jose',    last: 'Annunzi'}
    ];

    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', unregisterUser);

    function findUser(req, res) {
        var query = req.query;

        if (query.username && query.password) {
            findUserByCredentials(req, res);
        }
        else if (query.username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        for(var u in users) {
            if (users[u].username === username
                && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }

        res.send("0");
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        for(var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }

        res.send("0");
    }

    function findUserById(req, res) {
        var userId = req.params.uid;

        for(var u in users) {
            if (users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }

        res.send("0");
    }

    function createUser(req, res) {
        var user = req.body;
        users.push(user);

        res.sendStatus(200);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;

        for(var u in users) {
            if(users[u]._id === uid) {
                users[u] = user;
                break;
            }
        }

        res.sendStatus(200);
    }

    function unregisterUser(req, res) {
        var uid = req.params.uid;

        for(var u in users) {
            if(users[u]._id === uid) {
                users.splice(u, 1);
                break;
            }
        }

        res.sendStatus(200);
    }
};