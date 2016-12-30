var moment = require('moment');
var Article = require('../model/article.model');

const ArticleDao = {
    findById: function (postId, author) {
        return Article.findOne({_id: postId})
        //.select('title summary section cover status visit_count comment_count publish_time content')
            .exec();
    },

    find: function (section, currentPage, itemsPerPage, sortName) {
        var currentPage = (parseInt(currentPage) > 0) ? parseInt(currentPage) : 1;
        var itemsPerPage = (parseInt(itemsPerPage) > 0) ? parseInt(itemsPerPage) : 10;
        var startRow = (currentPage - 1) * itemsPerPage;

        var sort = String(sortName) || "publish_time";
        sort = "-" + sort;

        var condition = {status: {$gt: 0}};
        if (section) {
            condition = Object.assign(condition, {section: {$elemMatch: {$eq: section}}});
        }

        return Article.find(condition).skip(startRow)
            .limit(itemsPerPage)
            .sort(sort).exec();
    },
    // 创建,或更新一篇文章
    save: function (article) {
        article.status = article.status ? 1 : 0;
        if (article._id) {
            var id = article._id;
            //delete  article._id;
            return Article.update({_id: id}, article).then(function (raw) {
                return id;
            });
        }
        else {
            delete article._id;
            article.pv = 0;
            return Article.create(article).then(function (raw) {
                return raw._id;
            });
        }
    },

    //删除文章
    remove: function (postId) {
        //return Article.findByIdAndRemove(postId);
        //return Article.remove({_id: postId});
    },

    // 通过文章 id 给 pv 加 1
    incPv: function (postId) {
        return Article
            .update({_id: postId}, {$inc: {pv: 1}});
    },
}

module.exports = ArticleDao;
