// 配置权限
module.exports = function() {
  // 路径地址
  const path = require('path');
  const modelsPath = path.join(__dirname, '../../ftm/models');

  // 配置项
  const authorityList = require(modelsPath + '/authorityServer.js');

  // 是否要操作session的开关
  const userSessionSwitch = (function() {
    const checkUserSession = function() {
      return authorityList.needUserSession;
    };

    const setUserSession = function(status) {
      authorityList.needUserSession = status;
    };

    return {
      checkUserSession: checkUserSession,
      setUserSession: setUserSession
    };
  })();

  return {
    userSessionSwitch: userSessionSwitch
  }
};