require('./App.css');
require('./common');
require('avalon2/dist/avalon');
require('mmRouter');
require('mmRequest');

//component
require('./component/pager');
require('./component/dialog');

//vm
var vmApp = require('./mv/App.js');
var vmModelList = require('./mv/ModelList.js');
var mvData = require('./mv/Data');
var mvInfo = require('./mv/Info');
var mvField = require('./mv/Field');

//添加路由规则
avalon.router.add("/info/:id", function setPath(id) {
  vmApp.setCurrPath(this.path);
  vmModelList.id = id;
  mvInfo.request();
  log('---' + this.path);
});
avalon.router.add("/field/:id", function setPath(id) {
  vmApp.setCurrPath(this.path);
  vmModelList.id = id;
  mvField.request();
  log('---' + this.path);
});
avalon.router.add("/data/:id", function setPath(id) {
  vmApp.setCurrPath(this.path);
  vmModelList.id = id;
  mvData.request();
  log('---' + this.path);
});
avalon.router.error(function () {
  avalon.log('----error');
});

//启动路由监听
avalon.history.start({});

//启动扫描机制,让avalon接管页面
avalon.scan(document.body);