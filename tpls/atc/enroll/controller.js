'use strict';

const path = require('path');

const controllerPath = path.join(__dirname, '../../bps/controllers');

class ControllerHandle {
  constructor (router) {
    this._router = router;
  }

  setController (controllerName, server, coms) {
    return require(controllerPath + '/' + controllerName + '.js')(this._router, server, coms)();
  }
}

module.exports = ControllerHandle;