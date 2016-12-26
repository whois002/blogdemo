var moment = require('moment');
var User = require('../model/user.model');

const UserDao = {

    findByNickName: function (nickname) {
        return User.findOne({nickname: nickname})
            .exec();
    },

    create: function (user) {
        return User.create(user);
    },

}

module.exports = UserDao;
