/**
 * Created by linmingxiong on 16/9/27.
 */
var vm = avalon.define({
  $id: 'app',
  modelListTemp: require('../templates/modelList.html'),
  menus: {
    info: {
      path: 'info',
      temp: require('../templates/info.html'),
      name: '基本信息'
    },
    field: {
      path: 'field',
      temp: require('../templates/field.html'),
      name: '字段列表'
    },
    data: {
      path: 'data',
      temp: require('../templates/data.html'),
      name: '数据管理'
    }
  },
  clickHandle: function (menu) {
    var id = avalon.router.getLastPath().split('/')[2];
    location.hash = "#!/" + menu.path + '/' + id;

    this.currTemp = menu.temp;
    this.currPath = menu.path;
  },
  currTemp: '',
  currPath: 'info',
  setCurrPath: function (path) {
    var pathRoot = path.split('/')[1];
    this.currPath = pathRoot;
    this.currTemp = this.menus[pathRoot].temp;
  }
});
module.exports = vm;