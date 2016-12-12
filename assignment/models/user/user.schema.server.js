module.exports = function() {
    var mongoose = require("mongoose");

    /**
     * EMBEDDED SCHEMA
     var WebsiteSchema = require("../website/website.schema.server.js")();
     */

    var UserSchema = mongoose.Schema({      //instances of the records
        username: {type: String, required: true},
        password: {type: String},
        first: {type: String},
        last: String,
        email: String,
        phone: String,
        google: {
            id: String,
            token: String
        },
        facebook: {
            id:    String,
            token: String
        },
        role: {type: String, enum: ['ADMIN', 'STUDENT', 'FACULTY'], default: 'STUDENT'},
        websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        posted: {type: Date, default: Date.now}
    }, {collection: 'user'});

    return UserSchema;
};