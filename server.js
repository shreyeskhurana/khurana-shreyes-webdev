var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); //instance of express library
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var websites = [
    { _id: "123", name: "Facebook",    uid: "456" },
    { _id: "234", name: "Tweeter",     uid: "456" },
    { _id: "456", name: "Gizmodo",     uid: "456" },
    { _id: "567", name: "Tic Tac Toe", uid: "123" },
    { _id: "678", name: "Checkers",    uid: "123" },
    { _id: "789", name: "Chess",       uid: "234" }
];

app.get("/websites", function(req, res){
    res.send(websites);
});

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);