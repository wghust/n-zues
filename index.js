#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var ora = require('ora');
var formatJson = require('format-json');
var spinner = ora({
  text: ''
});

var src = '';
var dist = '';
var projectName = '';

// 基础参数配置
program
  .version('0.1.0')
  .option('-p, --port [type]', 'set app port', parseInt);

program
  .version('0.1.0')
  .usage('[options] [dir]')
  .parse(process.argv);

// 显示项目结构
var showExtendIfm = function() {
  console.log('--------------------------------------------');
  console.log('\n   install dependencies:');
  console.log('     cd ' + projectName + ' && (sudo) npm install\n');
  console.log('   run the app:')
  console.log('     make start-service\n');
  console.log('--------------------------------------------');
};

// 设置package.json
var setPackage = function() {
  var pkgPath = dist + '/package.json';
  fs.readFile(pkgPath, function(err, buffer) {
    if (err) {
      spinner.text = '初始化配置失败';
      spinner.fail();
    } else {
      var conJson = JSON.parse(buffer.toString());
      conJson.name = projectName;
      fs.writeFile(pkgPath, formatJson.plain(conJson), function(error) {
        if (error) {
          spinner.text = '初始化配置失败';
          spinner.fail();
        } else {
          spinner.text = '初始化配置成功';
          spinner.succeed();
          showExtendIfm();
        }
      });
    }
  });
};

// 设置配置
var setConfig = function() {
  spinner.start();
  spinner.text = '初始化配置';
  var cfgPath = dist + '/atc/configs/cfg.json';
  fs.readFile(cfgPath, function(err, buffer) {
    if (err) {
      spinner.text = '初始化配置失败';
      spinner.fail();
    } else {
      var conJson = JSON.parse(buffer.toString());
      conJson.base.port = program.port;
      conJson.base.host = projectName + '.tongbanjie.com';
      conJson.base.cookieSecret = 'tongbanjie' + projectName;
      conJson.db.config.name = projectName;
      fs.writeFile(cfgPath, formatJson.plain(conJson), function(error) {
        if (error) {
          spinner.text = '初始化配置失败';
          spinner.fail();
        } else {
          setPackage();
        }
      });
    }
  });
};

// 创建项目
var createProject = function() {
  spinner.start();
  spinner.text = '正在构建目录...';
  exec('cp -rf ' + src + ' ' + dist + '/.', function(error, stdout, stderr) {
    if (error) {
      spinner.text = '构建目录失败';
      spinner.fail();
    } else {
      spinner.text = '构建目录成功';
      spinner.succeed();
      setConfig();
    }
  });
};

// 判断文件夹是否存在
var existProject = function() {
  spinner.start();
  spinner.text = '开始创建项目...';
  fs.exists(dist, function(isExist) {
    if (isExist) {
      spinner.text = '项目已经存在';
      spinner.fail();
    } else {
      fs.mkdir(dist, function(err) {
        if (err) {
          spinner.text = '项目创建失败';
          spinner.fail();
        } else {
          spinner.text = '创建项目成功';
          spinner.succeed();
          createProject();
        }
      });
    }
  });
};


if (program.args) {
  projectName = program.args[0];
  src = path.resolve(__dirname, './tpls/*');
  dist = process.cwd() + '/' + projectName;
  existProject();
}