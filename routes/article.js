var express = require('express');
var marked = require('marked');
var router = express.Router();

var Common = require('../dao/comment.dao');
var Article = require('../dao/article.dao');

// GET /post/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
    var postId = req.params.postId;

    Promise.all([
        Article.findById(postId),// 获取文章信息
        Common.findByAId(postId),// 获取该文章所有留言
        Article.incPv(postId)// pv 加 1
    ])
        .then(function (result) {
            var article = result[0];
            var comments = result[1];
            if (!article) {
                throw new Error('该文章不存在');
            }

            article.content = marked(article.content);

            res.render('article', {
                article: article,
                comments: comments
            });
        })
        .catch(next);
});

module.exports = router;
