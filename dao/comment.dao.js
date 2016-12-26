var moment = require('moment');
var Comment = require('../model/comment.model');

const CommentDao = {

    findByAId: function (aId) {
        return Comment.find({aId: aId})
            .exec();
    },

    create: function create(comment) {
        return Comment.create(comment).exec();
    },

    // 通过留言 id 删除一个留言
    delCommentById: function delCommentById(commentId, author) {
        return Comment.remove({_id: commentId}).exec();
    },
}

module.exports = CommentDao;
