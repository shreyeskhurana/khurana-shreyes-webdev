var express = require('express');
var app = express();

var bodyParser = require('body-parser');
//instance of express library : app.use(..);
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./project/app")(app);

//require("./ejs/forms/app")(app);
//require("./wax/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);