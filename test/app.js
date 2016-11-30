module.exports = function(app)
{
    app.get("/api/test", findAllMessages);
    app.post("/api/test", createMessage);
    app.delete("/api/test/:id", deleteMessage);

    /*var connectionString = 'mongodb://127.0.0.1:27017/test';

    if(process.env.MLAB_USERNAME) {
        var username = process.env.MLAB_USERNAME;
        var password = process.env.MLAB_PASSWORD;
        connectionString = "mongodb://"+ username + ":" + password +
            "@ds149577.mlab.com:49577/mlabs_mongodb_webdev";
    }*/

    var connectionString = "mongodb://shreyes:12345678@ds149577.mlab.com:49577/mlabs_mongodb_webdev";

    var mongoose = require("mongoose");     //npm install mongoose --save
    mongoose.connect(connectionString);     //connecting to a database

    var TestSchema = mongoose.Schema({      //instances of the records
        message: String
    },{collection: 'messages'});

    var TestModel = mongoose.model("TestModel", TestSchema); //model should match this schema

    function findAllMessages(req, res) {
        TestModel
            .find() //read all operation, one of the raw functions mongo allows you to invoke
            //equivalent of select * from messages.
            .then(
                function(tests) {
                    res.json(tests);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        TestModel
            .create(req.body)
            .then(
                function(test) {
                    res.json(test);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        TestModel
            .remove({_id: req.params.id})
            .then(
                function(result) {
                    res.json(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};