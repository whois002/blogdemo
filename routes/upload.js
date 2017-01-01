var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next) {
    res.send({success: 1, files: req.files});
});


router.use('/', function(err, req, res, next) {
    if (err) {
        res.send({success: 0, err});
    }
    else
        res.send({success: 0, err:'上传错误'});
});


module.exports = router;
