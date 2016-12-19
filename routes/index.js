module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/articles');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/articles', require('./articles'));
    app.use('/post', require('./post'));

    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
};
