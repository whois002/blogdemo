var express = require('express');
var router = express.Router();

var Article = require('../model/article.model');

// GET /posts 所有文章或某个分类的文章
//   eg: GET /posts?section=xxx
router.get('/', function (req, res, next) {

    var currentPage = (parseInt(req.query.currentPage) > 0) ? parseInt(req.query.currentPage) : 1;
    var itemsPerPage = (parseInt(req.query.itemsPerPage) > 0) ? parseInt(req.query.itemsPerPage) : 10;
    var startRow = (currentPage - 1) * itemsPerPage;
    var sort = String(req.query.sortName) || "publish_time";
    sort = "-" + sort;

    var condition = {status: {$gt: 0}};
    if (req.query.section) {
        var section = String(req.query.section);
        condition = Object.assign(condition, {section: {$elemMatch: {$eq: section}}});
    }

    Article.find(condition)
        .select('title content cover visit_count comment_count like_count publish_time')
        .skip(startRow)
        .limit(itemsPerPage)
        .sort(sort)
        .exec().then(
        function (articles) {
            console.log("--------------");
            console.log(arguments);
            res.render('articles', {
                articles: articles
            });
        }).catch(
        function (err) {
            console.error(err);
            res.send(err);
        });

});


module.exports = router;
