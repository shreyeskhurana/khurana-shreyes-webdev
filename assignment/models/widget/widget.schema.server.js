module.exports = function() {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({      //instances of the records
        _page: {type: mongoose.Schema.Types.ObjectId, ref:'PageModel'},
        type: {type: String, enum: ['HEADER', 'HTML', 'IMAGE', 'YOUTUBE', 'INPUT']},
        name: {type: String},
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        index: Number,
        posted: {type: Date, default: Date.now}
    }, {collection: 'widget'});

    return WidgetSchema;
};