var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var User = require('../model/user.model');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signin');
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
    var nickname = req.fields.nickname;
    var password = req.fields.password;

    User.findOneAsync({
        nickname: nickname
    }).then(function (user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('back');
        }
        // 检查密码是否匹配
        console.log('-------------------pasword');
        console.log(sha1(password));
        console.log(user);
        //if (sha1(password) !== user.password) {
        if(user.authenticate(password)){
            req.flash('error', '用户名或密码错误');
            return res.redirect('back');
        }
        req.flash('success', '登录成功');
        // 用户信息写入 session
        delete user.password;
        req.session.user = user;
        // 跳转到主页
        res.redirect('/index');
    }).catch(
        function (err) {
            // 用户名被占用则跳回注册页，而不是错误页
            if (err.message.match('E11000 duplicate key')) {
                req.flash('error', '用户名已被占用');
                return res.redirect('/signup');
            }
            next(err);
        }
    );
});

module.exports = router;
