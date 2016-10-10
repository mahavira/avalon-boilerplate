require('./App.css');
require('./common');
require('avalon2/dist/avalon');
require('mmRouter');
require('mmRequest');

//component
require('./component/pager');
require('./component/cancelDialog');
require('./component/dialog');
require('./component/dropdown');
require('./component/pagination');
require('./component/spinner');
require('./component/datepicker');

//filters
require('./filters/join');

//vm
var vmApp = require('./App.js');
var vmModelList = require('./mv/model');
var mvData = require('./mv/data');
var mvInfo = require('./mv/info');
var mvField = require('./mv/field');
//复用通用vm
require('./mv/notice');
require('./mv/alert');

//添加路由规则
avalon.router.add("/info/:id", function setPath(id) {
  vmApp.setCurrPath(this.path);
  vmModelList.id = id;
  mvInfo.id = id;
  mvInfo.request();
});
avalon.router.add("/field/:id", function setPath(id) {
  vmApp.setCurrPath(this.path);
  vmModelList.id = id;
  mvField.id = id;
  mvField.request();
});
avalon.router.add("/data/:id", function setPath(id) {
  vmApp.setCurrPath(this.path);
  vmModelList.id = id;
  mvData.id = id;
  mvData.request();
});
avalon.router.error(function () {
});

//启动路由监听
avalon.history.start({});

//启动扫描机制,让avalon接管页面
avalon.scan(document.body);