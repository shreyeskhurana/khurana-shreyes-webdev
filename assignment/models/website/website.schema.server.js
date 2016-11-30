module.exports = function() {
    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({      //instances of the records
        _user: {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
        name: {type: String, required: true},
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref:'PageModel'}],
        posted: {type: Date, default: Date.now}
    }, {collection: 'website'});

    return WebsiteSchema;
};