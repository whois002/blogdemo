var Comment = require('../model/comment.model');

const CommentDao = {

    findByAId: function (aId) {
        return Comment.find({aId: aId}).populate('author')
            .exec();
    },

    create: function (comment) {
        return Comment.createAsync(comment);
    },

    // 通过留言 id 删除一个留言
    delCommentById: function (commentId, author) {
        return Comment.remove({_id: commentId});
    },
}

module.exports = CommentDao;
