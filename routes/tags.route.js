var express = require('express');
var router = express.Router();

var Tag = require('../dao/tag.dao');
var Article = require('../dao/article.dao');

// GET /tags
router.get('/', function (req, res, next) {
    Tag.find()
        .then(function (tags) {
            res.render('tags', {
                tags: tags
            });
        })
        .catch(next);
});

// GET /tags/name
router.get('/:name', function (req, res, next) {
    let name = req.params.name;
    Article.findByTag(name)
        .then(function (articles) {
            articles = articles.map(function (article) {
                return article.info4List;
            })
            res.render('articles', {
                articles: articles,
                tag: {name}
            });
        })
        .catch(next);
});

module.exports = router;
