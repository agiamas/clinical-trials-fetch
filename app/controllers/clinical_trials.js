/**
 * global logger
 *
 */
var sys = require('sys');
var util = require('util');

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    ClinicalTrial = mongoose.model('ClinicalTrial'),
    _ = require('underscore');


/**
 * Find article by id
 */
exports.clinical_trial = function(req, res, next, id) {
    ClinicalTrial.load(id, function(err, clinical_trial) {
        if (err) return next(err);
        if (!clinical_trial) return next(new Error('Failed to load clinical trial ' + id));
        req.clinical_trial = clinical_trial;
        next();
    });
};

exports.clinical_trial_results = function(req, res, next, id) {
    ClinicalTrial.load(id, function(err, clinical_trial_location) {
        if (err) return next(err);
        if (!clinical_trial_location) return next(new Error('Failed to load clinical trial ' + id));
        req.clinical_trial_location = clinical_trial_location;
        next();
    });
};

exports.clinical_trial_location = function(req, res, next, id) {
    req.clinical_trial_location = req.param('ctlocation');
};

exports.clinical_trial_condition = function(req, res, next, id) {
        req.clinical_trial_condition = req.param('ctcondition');
};

exports.clinical_trial_result = function(req, res, next, id) {
    ClinicalTrial.load(id, function(err, clinical_trial_result) {
        if (err) return next(err);
        if (!clinical_trial_result) return next(new Error('Failed to load clinical trial ' + id));
        req.clinical_trial_result = clinical_trial_result;
        next();
    });
}

/**
 * Show an article
 */
exports.show = function(req, res) {
//    sys.puts(util.inspect(req.params['clinicaltrialId']));
   //sys.puts(util.inspect(req.params.id));
    res.jsonp(req.clinical_trial);
};

exports.search = function(req, res) {
    res.jsonp(req.clinical_trial_result);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    ClinicalTrial.find().limit(10).exec(function(err, clinical_trials) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(clinical_trials);
        }
    });
};