var checkLogin = require('../middlewares/check').checkLogin;

module.exports = function (app) {
    app.get('/index', function (req, res) {
        res.redirect('/articles');
    });
    app.get('/', function (req, res) {
        res.redirect('/articles');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/articles', require('./articles'));
    app.use('/article', require('./article'));
    app.use('/admin', checkLogin, require('./admin'));
    // app.use('/admin/posts', checkLogin, require('./posts'));
    // app.use('/admin/post', checkLogin, require('./post'));
    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};
