/**
 * Created by linmingxiong on 16/9/27.
 */
var vm = avalon.define({
  $id: 'app',
  modelListTemp: require('./mv/model/index.html'),
  menus: {
    info: {
      path: 'info',
      temp: require('./mv/info/info.html'),
      name: '基本信息'
    },
    field: {
      path: 'field',
      temp: require('./mv/field/field.html'),
      name: '字段列表'
    },
    data: {
      path: 'data',
      temp: require('./mv/data/data.html'),
      name: '数据管理'
    }
  },
  clickHandle: function (menu) {
    var id = avalon.router.getLastPath().split('/')[2];
    location.hash = "#!/" + menu.path + '/' + id;
    this.currPath = menu.path;
  },
  currPath: 'info',
  setCurrPath: function (path) {
    this.currPath = path.split('/')[1];
  }
});
module.exports = vm;