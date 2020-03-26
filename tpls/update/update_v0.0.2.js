/**
 * author: 止水
 * version: v0.0.2
 * description: 更新方式demo
 */

var mongoose = require("mongoose");
var s = require('../configs/serverSetting');
mongoose.connect("mongodb://" + s.mongodbConfig.host + ":" + s.mongodbConfig.port + "/" + s.mongodbConfig.db, function onMongooseError(err) {
  if (err) {
    throw err;
  }
});

// 数据库配置
var modelsServer = require('../configs/serverList.js')(mongoose);

var pageBase = require('../controllers/base.js')(modelsServer.page);
var catBase = require('../controllers/base.js')(modelsServer.cat);
var accountBase = require('../controllers/base.js')(modelsServer.account);

// 更新文章的用户信息
var pageContainInitUser = function() {
  // 设置默认的
  var defaultUser = {
    email: 'zhishui@tongbanjie.com'
  };

  accountBase.find.findOne({
    email: defaultUser.email
  }, function(err, result) {
    pageBase.update.baseUpdate({}, {
      $set: {
        author: {
          uuid: result.uuid,
          email: result.email
        }
      }
    }, {
      multi: true
    }, function(err, back) {
      if (err) {
        console.log("更新文章作者失败");
      } else {
        console.log("更新文章作者成功");
      }
    });
  })
};

pageContainInitUser();

// 更新栏目的用户信息
var catContainInitUser = function() {
  // 设置默认的
  var defaultUser = {
    email: 'zhishui@tongbanjie.com'
  };

  accountBase.find.findOne({
    email: defaultUser.email
  }, function(err, result) {
    catBase.update.baseUpdate({}, {
      $set: {
        author: {
          uuid: result.uuid,
          email: result.email
        }
      }
    }, {
      multi: true
    }, function(err, back) {
      if (err) {
        console.log("更新栏目作者失败");
      } else {
        console.log("更新栏目作者成功");
      }
    })
  })
};

catContainInitUser();