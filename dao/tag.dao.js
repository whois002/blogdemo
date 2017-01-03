'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Tag = require('../model/tag.model');


const TagDao = {
    save: function (tag) {
        tag.is_index = tag.is_index ? 1 : 0;
        tag.is_show = tag.is_show ? 1 : 0;
        tag.sort = tag.sort ? tag.sort : 1;
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