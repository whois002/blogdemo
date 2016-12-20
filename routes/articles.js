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
        condition = _.defaults(condition, {section: {$elemMatch: {$eq: section}}});
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

router.get('/create', function (req, res, next) {
    res.send('create');
    var index = 0;
    var indexOne = 1;
    var indexTwo = 2
    Article.create({
        title: '第' + (index + indexOne) + '篇文章',
        content: '<p>我第' + (index + indexOne) + '次爱你.</p>',
        status: 1
    }, {
        title: '第' + (index + indexTwo) + '篇文章',
        content: '<p>我第' + (index + indexTwo) + '次爱你.</p>',
        status: 1
    }, function (err, node, numAffected) {
        console.log(arguments);
    });
})


module.exports = router;
