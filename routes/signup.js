var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var User = require('../dao/user.dao');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
    res.render('signup');
});

// POST /signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
    var nickname = req.fields.nickname;
    //var avatar = req.files.avatar.path.split(path.sep).pop();
    var password = req.fields.password;
    var repassword = req.fields.repassword;

    // 校验参数
    try {
        if (!(nickname.length >= 1 && nickname.length <= 10)) {
            throw new Error('名字请限制在 1-10 个字符');
        }
        // if (!req.files.avatar.name) {
        //   throw new Error('缺少头像');
        // }
        if (password.length < 6) {
            throw new Error('密码至少 6 个字符');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('signup');
    }

    // 明文密码加密
    //password = sha1(password);

    // 待写入数据库的用户信息
    var user = {
        nickname: nickname,
        password: password
    };
    User.create(user).then(
        function (user) {
            delete user.password;
            req.session.user = user;
            // 写入 flash
            req.flash('success', '注册成功');
            // 跳转到首页
            res.redirect('index');
        }
    ).catch(
        function (err) {
            // 用户名被占用则跳回注册页，而不是错误页
            // if (err.message.match('E11000 duplicate key')) {
            //     req.flash('error', '用户名已被占用');
            //     return res.redirect('signup');
            // }
            if (err.errors && err.errors.nickname) {
                req.flash('error', err.errors.nickname.message);
                return res.redirect('signup');
            }
            next(err);
        }
    );
});

module.exports = router;
