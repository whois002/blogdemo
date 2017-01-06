var Article = require('../dao/article.dao.js');
var Tag = require('../dao/tag.dao.js');

function defaultData(req, res, next) {
    Promise.all([
        Article.lastArticles(),
        Tag.findFrontList()
    ]).then(function (result) {
        var lastArticles = result[0].map(function (article) {
            return article.info4LastList;
        });
        var tags = result[1];
        console.log(tags);
        res.locals._defaultData = {lastArticles, tags};
        next();
    }).catch(next);
}


module.exports = defaultData;
