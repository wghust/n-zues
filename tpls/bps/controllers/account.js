const path = require('path');
const debug = require('debug')('zues');
const modulesPath = path.join(__dirname, '../../ftm/modules');

// 权限开关
const authority = require('./authority.js')();

// 业务处理
class Bus {
  constructor(server, coms) {
    this._s = server;
    this._c = coms;
    this._tb = require(modulesPath + '/controller-base/controller-base.js')(this._s.account);
  }
};

// 路由控制
class Router {
  constructor(router, server, coms) {
    this._r = router;
    this._s = server;
    this._c = coms;
    this._b = new Bus(server, coms);
    // 开启路由
    this.routerImplement();
  }

  routerImplement () {
    const rt = this._r;
    const co = this._c;
    const bu = this._b;

    // 测试第二波数据
    rt.get('/show/data2', (req, res) => {
      res.json({
        id: 2,
        data: 'data2'
      });
    });
  }
}

// 导出控制
module.exports = function(router, server, coms) {
  return function() {
    return new Router(router, server, coms)
  }
};