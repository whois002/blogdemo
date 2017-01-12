var moment = require('moment');

exports.statusFormat = function (status) {
    return status ? '发布' : '删除';
}

exports.isIndexFormat = function (status) {
    return status ? '显示' : '不显示';
}

exports.dateTimeFormat = function dateTimeFormat(dateTime) {
    return moment(dateTime).format("YYYY年MM月DD")
}