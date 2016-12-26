var moment = require('moment');
var User = require('../model/user.model');

const UserDao = {

    findByNickName: function (nickname) {
        return User.findOne({nickname: nickname})
            .exec();
    },

    create: function create(user) {
        return User.create(user).exec();
    },

}

module.exports = UserDao;
