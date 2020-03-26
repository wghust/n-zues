'use strict';

/**
 * 查询类
 */
class DbcFind {
  constructor(server) {
    this._ser = server;
  }

  baseFind(options, selectIndex, selectNum, cb) {
    this._ser.find(options, selectIndex, selectNum, (err, results) => {
      cb(err, results);
    });
  }

  findOne(options, cb) {
    this._ser.findOne(options, (err, result) => {
      cb(err, result);
    });
  }

  findCount(options, cb) {
    this._ser.findCount(options, (err, countNum) => {
      cb(err, countNum);
    });
  }
}

/**
 * 更新类
 */
class DbcUpdate {
  constructor(server) {
    this._ser = server;
  }

  baseUpdate(selections, updateParams, options, cb) {
    this._ser.update(selections, updateParams, options, (err, updateResult) => {
      cb(err, updateResult);
    });
  }
}

/**
 * 保存类
 */
class DbcSave {
  constructor(server) {
    this._ser = server;
  }

  baseSave(data, cb) {
    this._ser.save(data, (err, backData) => {
      cb(err, backData);
    });
  }
}

/**
 * 删除类
 */
class DbcRemove {
  constructor(server) {
    this._ser = server;
  }

  baseRemove(options, cb) {
    this._ser.remove(options, (err) => {
      cb(err);
    });
  }
}

/**
 * 主入口
 */
class DbController {
  constructor(server) {
    this._ser = server;
    // 对外find方法
    this.find = new DbcFind(server);
    this.update = new DbcUpdate(server);
    this.save = new DbcSave(server);
    this.remove = new DbcRemove(server);
  }
}

module.exports = function(server) {
  return new DbController(server);
};