/**
 * Created by shuaigeng.zhao on 2016/2/22.
 */
var express = require('express');
var router = express.Router();
var _ = require('underscore');
var positionService = require('../services/positionService');
var options = {
    workYear: "1-3年,3-5年",
    salary: '12',
    address: "",
    timelyRate: 0,
    avgTime: 9,

    curPage: 1,
    pageSize: 10,

    sortField: "_id",
    sortOrder: 1
};

router.get('/', function(req, res, next){

    positionService.findPosition({}, function(err, positionList){

        if (err) {
            console.log(err);
        } else {
            res.render('main', {
                positionList: positionList,
                condition: options
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
                condition: _.extend(options, opts)
            });
        }
    });
});

router.post('/list', function(req, res, next){

    var opts = req.body;

    positionService.findPosition(opts, function(err, positionList){

        if (err) {
            console.log(err);
        } else {
            //res.render('main', {
            //    positionList: positionList,
            //    condition: _.extend(positionService.condition, opts)
            //});
            res.send({
                positionList: positionList,
                condition: _.extend(options, opts)
            });
        }
    });
});

module.exports = router;