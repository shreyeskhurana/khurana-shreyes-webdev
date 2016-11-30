module.exports = function() {
    var mongoose = require("mongoose");

    /**
     * EMBEDDED SCHEMA
     var WebsiteSchema = require("../website/website.schema.server.js")();
     */

    var UserSchema = mongoose.Schema({      //instances of the records
        username: {type: String, required: true},
        password: {type: String, required: true},
        first: {type: String, required: true},
        last: String,
        email: String,
        phone: String,
        google: {
            id: String,
            token: String
        },
        role: {type: String, enum: ['ADMIN', 'STUDENT', 'FACULTY'], default: 'STUDENT'},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        posted: {type: Date, default: Date.now}
    }, {collection: 'user'});

    /*var user = {
        username: 'alice',
        websites: [
             {_id: "123", name: "facebook.com"},
             {_id: "123", name: "facebook.com"}
        ]
    };*/

    return UserSchema;
};