/**
 * 配置数据库，model和controller初始化配置
 */
'use strict';
const mongoose = require('mongoose');
const ModelHandle = require('./model.js');
const ControllerHandle = require('./controller.js');

class EnrollInit {
  constructor (router) {
    this._baseConfigs = require('../configs/cfg.json');
    this._configs = require('../configs/mc.json');
    this._mongoose = mongoose;
    this._router = router;

    // 数据库配置
    this._dbConfig = mongoose.connect('mongodb://' + this._baseConfigs.db.config.host + ':' + this._baseConfigs.db.config.port + '/' + this._baseConfigs.db.config.name, function onMongooseError(err) {
      if (err) {
        throw err;
      }
    });
  }

  // 初始化model配置项
  modelInit () {
    const modelInit = new ModelHandle(this._dbConfig);
    const serverList = {};

    for (let i = 0; i < this._configs.models.length; i++) {
      const temp = modelInit.enrollDb(this._configs.models[i]);
      serverList[this._configs.models[i]] = temp;
    }
    return serverList;
  }

  // 初始化controller配置项
  controllerInit (controllerName, server, coms) {
    if (this._configs.controllers.indexOf(controllerName) === -1) {
      return false;
    }
    const controllerInit = new ControllerHandle(this._router);
    controllerInit.setController(controllerName, server, coms);
    return true;
  }
}

module.exports = function(router) {
  return new EnrollInit(router);
};