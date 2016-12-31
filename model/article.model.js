/**
 * 文章表
 */
'use strict';
var moment = require('moment');
//var objectIdToTimestamp = require('objectid-to-timestamp');
var mongoose = require('mongoose');

function statusFormat(status) {
    return status ? '发布' : '删除';
}

function dateTimeFormat(dateTime) {
    return moment(dateTime).format("YYYY-MM-DD HH:mm")
}

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        unique: true
    },
    //概要
    summary: String,
    //内容
    content: String,
    //首页图片
    cover:String,
    //存储文章所用到的图片
    images: {
        type: Array
    },
    //分类
    section: {
        type: Schema.Types.ObjectId,
        ref: 'Dictionary'
    },
    //一篇文章可以有多个标签
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    visit_count: {			//访问数
        type: Number,
        default: 1
    },
    comment_count: {		//评论数
        type: Number,
        default: 0
    },
    like_count: {
        type: Number,
        default: 1
    },
    top: {
        type: Boolean,
        default: false
    },
    status: {				//0:草稿 1:发布
        type: Number,
        default: 0
    },
    pv : {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    publish_time: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }

});

// ArticleSchema
//     .virtual('info')
//     .get(function () {
//         return {
//             '_id': this._id,
//             'title': this.title,
//             'content': this.content,
//             'summary': this.summary,
//             'section': this.section,
//             'cover': this.cover,
//             'images': this.images,
//             'visit_count': this.visit_count,
//             'comment_count': this.comment_count,
//             'like_count': this.like_count,
//             'publish_time': moment(this.publish_time).format("YYYY-MM-DD HH:mm")
//         };
//     });

ArticleSchema
    .virtual('postViewInfo')
    .get(function () {
        return {
            '_id': this._id,
            'title': this.title,
            'summary': this.summary,
            'section': this.section,
            'cover': this.cover,
            'status': statusFormat(this.status),
            'visit_count': this.visit_count,
            'comment_count': this.comment_count,
            'publish_time': dateTimeFormat(this.publish_time),
            'updated': dateTimeFormat(this.updated)
        };
    });

// ArticleSchema.set('toJSON', { virtuals: true })
 ArticleSchema.set('toObject', { virtuals: true });
var Article = mongoose.model('articles', ArticleSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Article);
Promise.promisifyAll(Article.prototype);

module.exports = Article;