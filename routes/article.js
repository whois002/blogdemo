var express = require('express');
var router = express.Router();

var PostModel = require('../models/posts');
var CommentModel = require('../models/comments');
var checkLogin = require('../middlewares/check').checkLogin;
var Article = require('../model/article.model');

// GET /post/:postId 单独一篇的文章页
router.get('/:postId', function (req, res, next) {
    var postId = req.params.postId;
    Article.findOne({_id: postId})
        //.populate('tags')
        .exec().then(
        function (article) {
            res.render('article', {
                article: article
            });
        }).catch(
        function (err) {
            console.error(err);
            res.send(err);
        });
});

module.exports = router;
