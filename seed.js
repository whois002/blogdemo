/**
 * 初始化数据
 */

'use strict';
var config = require('config-lite');
var mongoose = require('mongoose');
var Dictionary = require('./model/dictionary.model');
//mongoose promise 风格
mongoose.Promise = global.Promise;
// 连接数据库.
mongoose.connect(config.mongodb);

console.log("seed start");

//初始化标签,文章,用户
// if(process.env.NODE_ENV === 'development'){
    Dictionary.countAsync().then(function (count) {
        console.log("seed create dictionary count=" + count);
        if(count === 0){
            Dictionary.removeAsync().then(function () {
                console.log("seed create dictionary");
                Dictionary.createAsync({
                    category:'section',
                    name:'分类1',
                    status:1
                },{
                    category:'section',
                    name:'分类2',
                    status:1
                },{
                    category:'section',
                    name:'分类3',
                    status:1
                },{
                    category:'section',
                    name:'分类3删除了',
                    status:0
                });
            });
        }
    });
// }

console.log("seed end");