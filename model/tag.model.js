/**
 * 标签表
 */

'use strict';
var common = require('../utils/commonFun');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    name: {						//标签名称
        type: String,
        unique: true
    },
    text: {						//标签显示名称
        type: String
    },
    is_index: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        default: 1
    },
    sort: {
        type: Number,
        default: 1
    },
    created: {
        type: Date,
        default: Date.now
    }
});


TagSchema
    .virtual('info4List')
    .get(function () {
        return {
            '_id': this._id,
            'name': this.name,
            'text': this.text,
            'is_index': common.isIndexFormat(this.is_index),
            'sort': this.sort,
            'status': common.statusFormat(this.status),
            'created': common.dateTimeFormat(this.created)
        };
    });

TagSchema.set('toObject', {virtuals: true});
var Tag = mongoose.model('tags', TagSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Tag);
Promise.promisifyAll(Tag.prototype);

module.exports = Tag;