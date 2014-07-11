/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * User Schema
 */
var ItemSchema = new Schema({
    itemId: String,
    description: String,
    photoLocation: String,
    merchantId: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Statics
 */
ItemSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username').exec(cb);
    }
};

mongoose.model('Item', ItemSchema);