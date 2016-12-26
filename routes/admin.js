var express = require('express');
var router = express.Router();

var Article = require('../dao/article.dao');
var Comment = require('../dao/comment.dao');

// GET /admin
router.get('/', function (req, res, next) {
    res.render('admin');
});


// GET /posts 所有文章或某个分类的文章
//   eg: GET /posts?section=xxx
router.get('/posts', function (req, res, next) {

    var section = req.query.section;
    var currentPage = req.query.currentPage;
    var itemsPerPage = req.query.itemsPerPage;
    var sortName = req.query.sortName;

    Article.find(section, currentPage, itemsPerPage, sortName)
        .then(function (articles) {
            res.render('posts', {
                articles: articles.map(function (article) {
                    return article.postInfo;
                })
            });
        }).catch(
        function (err) {
            console.error(err);
            res.send(err);
            next(err);
        });

});

// GET /post/:postId/edit 更新文章页
router.get('/post/:postId', function (req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;

    Promise.all([
        Article.findById(postId),// 获取文章信息
        Comment.findByAId(postId),// 获取该文章所有留言
        Article.incPv(postId)// pv 加 1
    ]).then(function (result) {
        var article = result[0];
        var comments = result[1];
        if (!article) {
            throw new Error('该文章不存在');
        }
        res.render('post', {
            article: article,
            comments: comments
        });
    }).catch(next);
});

// POST /post 发表一篇文章
router.post('/post/', function (req, res, next) {
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

    Article.save(post)
        .then(function (err, nPost) {
            req.flash('success', '编辑文章成功');
            // 编辑成功后跳转到上一页
            res.redirect(`/admin/post/${nPost._id}`);
        })
});


// GET /post/remove/:postId 删除一篇文章
router.get('/post/remove/:postId', function (req, res, next) {
    var postId = req.params.postId;
    var author = req.session.user._id;

    Article.remove(postId)
        .then(function (err) {
            req.flash('success', '删除文章成功');
            // 删除成功后跳转到主页
            res.redirect('/admin/posts');
        })
        .catch(next);
});


// GET /comment/remove/:commentId 删除一条留言
router.post('/comment/remove/:commentId', function (req, res, next) {
    var commentId = req.params.commentId;

    Comment.delCommentById(commentId)
        .then(function () {
            req.flash('success', '删除留言成功');
            // 删除成功后跳转到上一页
            res.redirect('back');
        })
        .catch(next);
});

module.exports = router;
