'use strict';

class DbModel {
  constructor(collect) {
    this._ct = collect;
  }

  find(findOptions, selectIndex, selectNum, cb) {
    if (selectIndex !== -1 && selectNum !== -1) {
      const skipIndex = selectIndex * selectNum;
      this._ct.find(findOptions).skip(skipIndex).limit(selectNum).sort({
        '_id': -1
      }).exec(function(err, results) {
        cb(err, results);
      });
    } else {
      this._ct.find(findOptions).sort({
        '_id': -1
      }).exec(function(err, results) {
        cb(err, results);
      });
    }
  }

  findOne(findOptions, cb) {
    this._ct.findOne(findOptions).exec(function(err, result) {
      cb(err, result);
    });
  }

  findCount(findOptions, cb) {
    this._ct.find(findOptions).count(function(err, countNum) {
      cb(err, countNum);
    });
  }

  save(newData, cb) {
    const ct = new this._ct(newData);
    ct.save(function(err) {
      cb(err, ct);
    });
  }

  update(updateSelections, updateParams, updateOptions, cb) {
    this._ct.update(updateSelections, updateParams, updateOptions).exec(function(err, back) {
      cb(err, back);
    });
  }

  remove(findOptions, cb) {
    this._ct.remove(findOptions).exec(function(err) {
      cb(err);
    });
  }
}

module.exports = function(collect) {
  return new DbModel(collect);
};