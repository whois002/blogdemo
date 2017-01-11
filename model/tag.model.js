/**
 * 标签表
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
    name:{						//标签名称
        type:String,
        unique: true
    },
    text:{						//标签显示名称
        type:String
    },
    is_index:{
        type:Number,
        default:1
    },
    status: {
        type:Number,
        default:1
    },
    sort:{
        type:Number,
        default:1
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var Tag = mongoose.model('Tag',TagSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Tag);
Promise.promisifyAll(Tag.prototype);

module.exports = Tag;