/**
 * 文章表
 */
'use strict';
//var objectIdToTimestamp = require('objectid-to-timestamp');
var common = require('../utils/commonFun');
var mongoose = require('mongoose');



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
    // tags: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Tag'
    // }],
    tags: [{
        type: String,
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


ArticleSchema
    .virtual('postViewInfo')
    .get(function () {
        return {
            '_id': this._id,
            'title': this.title,
            'summary': this.summary,
            'section': this.section,
            'cover': this.cover,
            'status': common.statusFormat(this.status),
            'visit_count': this.visit_count,
            'comment_count': this.comment_count,
            'publish_time': common.dateTimeFormat(this.publish_time),
            'updated': common.dateTimeFormat(this.updated)
        };
    });

//文章列表
ArticleSchema
    .virtual('info4List')
    .get(function () {
        return {
            '_id': this._id,
            'title': this.title,
            'summary': this.summary,
            'section': this.section,
            'cover': this.cover,
            'status': common.statusFormat(this.status),
            'publish_time': common.dateTimeFormat(this.publish_time)
        };
    });

//首页的最近文章
ArticleSchema
    .virtual('info4LastList')
    .get(function () {
        return {
            '_id': this._id,
            'title': this.title,
            'publish_time': common.dateTimeFormat(this.publish_time)
        };
    });

// ArticleSchema.set('toJSON', { virtuals: true })
 ArticleSchema.set('toObject', { virtuals: true });
var Article = mongoose.model('articles', ArticleSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Article);
Promise.promisifyAll(Article.prototype);

module.exports = Article;