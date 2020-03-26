'use strict';

const path = require('path');

// 获取路径
const schemaPath = path.join(__dirname, '../../dla/schema');
const modulesPath = path.join(__dirname, '../../ftm/modules');

// 获取model类
const dbModel = require(modulesPath + '/model-base/model-base.js');

class ModelEnroll {
  constructor(mongoose) {
    this._mongo = mongoose;
  }

  /**
   * [enrollDb 注册数据处理基础方法]
   * @param  {[type]} schemaName [description]
   * @return {[type]}            [description]
   */
  enrollDb(schemaName) {
    // 获取定义的schema
    const definition = require(schemaPath + '/' + schemaName + 'Schema.js');
    const schema = new this._mongo.Schema(definition);
    const model = this._mongo.model(schemaName, schema);
    const commonOp = dbModel(model);

    return commonOp;
  }
}

module.exports = ModelEnroll;