/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Item = mongoose.model('Item'),
    _ = require('underscore');


/**
 * Find item by id
 */
exports.item = function(req, res, next, id) {
    Item.load(id, function(err, item) {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load item ' + id));
        req.item = item;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var item = new Item(req.body);
    item.user = req.user;

    item.save(function(err) {
        if (err) {
            return res.send('items/add', {
                errors: err.errors,
                item: item
            });
        } else {
            res.jsonp(item);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var item = req.item;

    item = _.extend(item, req.body);

    item.save(function(err) {
        res.jsonp(item);
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var item = req.item;

    item.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(item);
        }
    });
};

/**
 * Show an item
 */
exports.show = function(req, res) {
    res.jsonp(req.item);
};

/**
 * List of items
 */
exports.all = function(req, res) {
    Item.find().sort('-created').populate('user', 'name username').exec(function(err, items) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(items);
        }
    });
};