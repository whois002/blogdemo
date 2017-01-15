var express = require('express');
var router = express.Router();

var Article = require('../dao/article.dao');

// GET /posts 所有文章或某个分类的文章
//   eg: GET /posts?section=xxx
router.get('/', function (req, res, next) {

    var section = req.query.section;
    var currentPage = req.query.currentPage;
    var itemsPerPage = req.query.itemsPerPage;

    Article.findBySection(section, currentPage, itemsPerPage)
        .then(function (articles) {
            res.render('articles', {
                articles: articles.map(function (article) {
                    return article.info4List;
                })
            });
        }).catch(next);

});


module.exports = router;
