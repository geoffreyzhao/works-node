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

router.get('/', function(req, res){

    var condition = _.extend(options, {});

    positionService.findPosition({}, function(err, results){

        if (err) {
            console.log(err);
        } else {
            condition.count = results[0];
            condition.pageNum = Math.ceil(results[0] / condition.pageSize);
            res.render('main', {
                positionList: results[1],
                condition: options
            });
        }
    });
});

router.post('/search', function(req, res){

    var opts = req.body;
    var condition = _.extend(options, opts);

    positionService.findPosition(opts, function(err, results){
        if (err) {
            console.log(err);
        } else {
            condition.count = results[0];
            condition.pageNum = Math.ceil(results[0] / condition.pageSize);
            res.render('main', {
                positionList: results[1],
                condition: condition
            });
        }
    });
});

module.exports = router;