/**
 * Created by shuaigeng.zhao on 2016/2/22.
 */
var express = require('express');
var router = express.Router();
var positionService = require('../services/positionService');

router.get('/', function(req, res, next){

    positionService.findPosition({}, function(err, positionList){

        if (err) {
            console.log(err);
        } else {
            res.render('main', {
                positionList: positionList,
                condition: {}
            });
        }
    });
});

router.post('/search', function(req, res, next){

    var opts = req.body;

    positionService.findPosition(opts, function(err, positionList){

        if (err) {
            console.log(err);
        } else {
            res.render('main', {
                positionList: positionList,
                condition: opts
            });
        }
    });
});

module.exports = router;