var express = require('express');
var router = express.Router();

var Comment = require('../dao/comment.dao');

// POST /comment/:postId 创建一条留言
router.post('/:postId', function (req, res, next) {
    var author = req.session.user._id;
    var postId = req.params.postId;
    var content = req.fields.content;
    var comment = {
        author: author,
        aId: postId,
        content: content
    };

    Comment.create(comment)
        .then(function () {
            req.flash('success', '留言成功');
            // 留言成功后跳转到上一页
            res.redirect('back');
        })
        .catch(next);
});

module.exports = router;