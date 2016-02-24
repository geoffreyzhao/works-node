/**
 * Created by shuaigeng.zhao on 2016/2/22.
 */
var express = require('express');
var router = express.Router();
var positionService = require('../services/positionService');

router.get('/', function(req, res, next){

    res.render('main', {
        positionList: positionService.positionList
    });
});

exports = module.exports = router;