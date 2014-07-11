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
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ClinicalTrialSchema = new Schema({
    clinical_study: {
        type: Object,
        rank: {
            type: String
        },
        brief_title: {
            type: String
        }
    }
}, { collection: 'clinical_trials' });

/**
 * Validations
 */
//ArticleSchema.path('title').validate(function(title) {
//    return title.length;
//}, 'Title cannot be blank');
//
/**
* Statics
*/
ClinicalTrialSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            'clinical_study.id_info.nct_id': id
        }).exec(cb);
    }
};

mongoose.model('ClinicalTrial', ClinicalTrialSchema);