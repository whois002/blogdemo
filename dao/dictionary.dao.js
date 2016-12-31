var Dictionary = require('../model/dictionary.model');

const DictionaryDao = {

    find: function (status) {
        var condition = typeof status === 'undefined' ? {} : {status: {$gt: status}};

        return Dictionary.find(condition).exec();
    },

    create: function (dictionary) {
        return Dictionary.createAsync(dictionary);
    },

    disableById: function (id, author) {
        return Dictionary.update({_id: commentId}).then(function (raw) {
            return id;
        });

    },
}

module.exports = DictionaryDao;
