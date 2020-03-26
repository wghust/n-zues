'use strict'

// 基础模块
var express = require('express');
var router = express.Router();
var moment = require('moment');
var uuid = require('uuid');
var s = require('../../atc/configs/cfg.json');

// 注入model和controller
const EnrollInit = require('../../atc/enroll/init.js')(router);
const modelsServer = EnrollInit.modelInit();

// 用户权限
EnrollInit.controllerInit('account', {
  account: modelsServer.account
}, {
  s: s,
  uuid: uuid,
  moment: moment
});

// 结束

// 基础路由控制
router.get('/', function(req, res) {
  res.render('index', {
    title: '自动收集数据平台',
    navType: 'index'
  });
});

// 404
router.get('*', function(req, res) {
  res.render('404', {
    title: '404',
    navType: '404'
  });
});

module.exports = router;