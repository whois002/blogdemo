'use strict';

var mongoose = require('mongoose');
var Tag = require('../model/tag.model');


const TagDao = {
    findById: function (id) {
        return Tag.findOne({_id: id}).exec();
    },

    findFrontList: function () {
        return this.find({status: 1, is_index: 1}, 1, 15);
    },

    findEndList: function (enable, currentPage, itemsPerPage) {
        var condition = null;
        if (enable === 0)
            condition = {status: 0};
        else if (enable === 1)
            condition = {status: 1};
        return this.find(condition, currentPage, itemsPerPage);
    },

    find: function (condition, currentPage, itemsPerPage, sortName) {
        if (typeof condition == 'number') {
            sortName = itemsPerPage;
            itemsPerPage = currentPage;
            currentPage = condition;
            condition = null;
        }

        var currentPage = (parseInt(currentPage) > 0) ? parseInt(currentPage) : 1;
        var itemsPerPage = (parseInt(itemsPerPage) > 0) ? parseInt(itemsPerPage) : 10;
        var startRow = (currentPage - 1) * itemsPerPage;

        var sort = sortName || "publish_time";
        sort = "-" + sort;

        //condition = condition ? Object.assign({}, condition) : null;
        Tag.find(condition).exec();
        return Tag.find(condition).skip(startRow)
            .limit(itemsPerPage)
            .sort(sort).exec();
    },

    save: function (tag) {
        tag.is_index = tag.is_index ? 1 : 0;
        tag.is_show = tag.is_show ? 1 : 0;
        tag.sort = tag.sort ? tag.sort : 1;
        console.log('tag.created');
        console.log(tag.created);
        tag.created = tag.created ? tag.created : new Date();
        console.log(tag.created);
        if (tag._id) {
            var id = tag._id;
            //delete  article._id;
            return Tag.update({_id: id}, tag).then(function (raw) {
                return id;
            });
        }
        else {
            delete tag._id;
            return Tag.create(tag).then(function (raw) {
                return raw._id;
            });
        }
    },

    remove: function (tagId) {
        return Tag.remove({_id: tagId});
    },
}

module.exports = TagDao;