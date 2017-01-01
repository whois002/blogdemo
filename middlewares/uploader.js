'use strict';
var path = require('path');

module.exports = function (app) {
    return function (opts) {
        if (opts.path) {
            app.post(opts.path, function (req, res, next) {
                var fileName = req.files.upfile.path;
                fileName = path.basename(fileName);
                res.send({success: 1, files: fileName});
            });

            app.post(opts.path, function (err, req, res, next) {
                if (err) {
                    res.send({success: 0, err: err.message});
                }
                else
                    res.send({success: 0, err: '上传错误'});
            });
        }
    }
};

