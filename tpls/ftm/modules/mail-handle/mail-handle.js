'use strict';

const mail = require('nodemailer');

class MailModule {
  constructor(settings) {
    this._s = settings.mail;
    this._smtpTransport = this.definitionMail();
  }

  definitionMail() {
    return mail.createTransport({
      service: this._s.service,
      auth: {
        user: this._s.auth.user,
        pass: this._s.auth.pass
      }
    });
  }

  sendMail(option, cb) {
    this._smtpTransport.sendMail(option, function(err, response) {
      cb(err);
    });
  }
}

module.exports = function(settings) {
  return new MailModule(settings);
};