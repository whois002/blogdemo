var moment = require('moment');
var express = require('express');
var router = express.Router();
var Article = require('../model/article.model');
var Comment = require('../model/comment.model');

// GET /post/create 发表文章页
router.get('/create', function (req, res, next) {
    res.render('create');
});

// POST /post 发表一篇文章
router.post('/', function (req, res, next) {
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    // 校验参数
    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw new Error('请填写内容');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    var post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    };

    // PostModel.create(post)
    //     .then(function (result) {
    //         // 此 post 是插入 mongodb 后的值，包含 _id
    //         post = result.ops[0];
    //         req.flash('success', '发表成功');
    //         // 发表成功后跳转到该文章页
    //         res.redirect(`/posts/${post._id}`);
    //     })
    //     .catch(next);
});

// GET /post/:postId/edit 更新文章页
router.get('/:postId', function (req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;

    Article.findOne({_id:postId}).populate('comments')
        .select('title summary section cover status visit_count comment_count publish_time comments content')
        .exec().then(
        function (article) {
            console.log("--------------");
            console.log(article);
            res.render('post', {
                article: article, comment:article.comments
            });
        }).catch(
        function (err) {
            console.error(err);
            res.send(err);
            next(err);
        });

    // PostModel.getRawPostById(postId)
    //     .then(function (post) {
    //         if (!post) {
    //             throw new Error('该文章不存在');
    //         }
    //         if (author.toString() !== post.author._id.toString()) {
    //             throw new Error('权限不足');
    //         }
    //         res.render('edit', {
    //             post: post
    //         });
    //     })
    //     .catch(next);
});




module.exports = router;
