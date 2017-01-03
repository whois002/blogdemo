var moment = require('moment');
var marked = require('marked');
var Article = require('../model/article.model');

const ArticleDao = {
    findById: function (postId) {
        return Article.findOne({_id: postId}).populate('section')
        //.select('title summary section cover statusFormat visit_count comment_count publish_time content')
            .exec().then(function (article) {
                article.tags = article.tags ? article.tags.join(" ") : '';
                return article;
            });
    },

    findByTag: function (tagName, currentPage, itemsPerPage, sortName) {
        var condition = {tags: tagName}
        return Article.find({tags: tagName}).exec();
    },

    find: function (section, currentPage, itemsPerPage, sortName) {
        var currentPage = (parseInt(currentPage) > 0) ? parseInt(currentPage) : 1;
        var itemsPerPage = (parseInt(itemsPerPage) > 0) ? parseInt(itemsPerPage) : 10;
        var startRow = (currentPage - 1) * itemsPerPage;

        var sort = sortName || "publish_time";
        sort = "-" + sort;

        var condition = {status: {$gt: 0}};
        if (section) {
            condition = Object.assign(condition, {section: {$eq: section}});
        }
        // console.log(condition);
        // console.log(startRow);
        // console.log(itemsPerPage);
        // console.log(sort);
        // console.log('------------------');
        return Article.find(condition).skip(startRow)
            .limit(itemsPerPage)
            .sort(sort).exec();
    },
    // 创建,或更新一篇文章
    save: function (article) {
        article.status = article.status ? 1 : 0;
        article.tags = Array.isArray(article.tags) ? article.tags : article.tags.split(" ");
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
        return Article.remove({_id: postId});
    },

    // 通过文章 id 给 pv 加 1
    incPv: function (postId) {
        return Article
            .update({_id: postId}, {$inc: {pv: 1}});
    },
}

module.exports = ArticleDao;
