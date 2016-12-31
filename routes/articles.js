var express = require('express');
var router = express.Router();

var Article = require('../dao/article.dao');

// GET /posts 所有文章或某个分类的文章
//   eg: GET /posts?section=xxx
router.get('/', function (req, res, next) {

    var section = req.query.section;
    var currentPage = req.query.currentPage;
    var itemsPerPage = req.query.itemsPerPage;
    var sortName = req.query.sortName;

    Article.find(section, currentPage, itemsPerPage, sortName)
        .then(
            function (articles) {
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
