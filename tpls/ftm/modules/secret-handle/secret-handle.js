'use strict';

const jwt = require('jwt-simple');
const crypto = require('crypto');

class SecretModule {
  constructor(settings) {
    this._settings = settings;
  }

  encode(params, cookieSecret) {
    return jwt.encode(params, cookieSecret);
  }

  decode(token, cookieSecret) {
    return jwt.decode(token, cookieSecret);
  }

  randomPass(len) {
    let randomPassword = '';
    let randomNum = 0;
    const randomString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPGRSTUVWXYZ';
    for (let i = 0; i < len; i++) {
      randomNum = Math.ceil(Math.random() * 58);
      randomPassword += randomString[randomNum];
    }
    return randomPassword;
  }

  hexEncode(str) {
    const shaSum = crypto.createHash('sha256');
    shaSum.update(str);
    return shaSum.digest('hex');
  }
}

module.exports = function(settings) {
  return new SecretModule(settings);
};