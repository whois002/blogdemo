/**
 * 评论表
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DictionarySchema = new Schema({
    category: String,
    status: {		//0,删除,1,正常
        type: Number,
        default: 1
    },
    name: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

var Dictionary = mongoose.model('Dictionary', DictionarySchema);

var Promise = require('bluebird');
Promise.promisifyAll(Dictionary);
Promise.promisifyAll(Dictionary.prototype);

module.exports = Dictionary;