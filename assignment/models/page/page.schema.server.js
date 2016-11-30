module.exports = function() {
    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({      //instances of the records
        _website: {type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'},
        name: {type: String, required: true},
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'WidgetModel'}],
        posted: {type: Date, default: Date.now}
    }, {collection: 'page'});

    return PageSchema;
};