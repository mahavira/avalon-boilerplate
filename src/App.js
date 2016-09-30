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
  dropdown: {
    data: [{value: 1, label: 'X'}, {value: 2, label: 'XX'}, {value: 3, label: 'XXX'}],
    currValue: [1, 3],
    defaultText: '请选择..',
    onSelect: function (value) {
      log(vm.dropdown.currValue)
    }
  },
  dropdown2: {
    data: [{value: 1, label: 'X'}, {value: 2, label: 'XX'}, {value: 3, label: 'XXX'}],
    currValue: [1, 3],
    defaultText: '请选择..',
    onSelect: function (value) {
      log(vm.dropdown.currValue)
    }
  },
  clickHandle: function (menu) {
    var id = avalon.router.getLastPath().split('/')[2];
    location.hash = "#!/" + menu.path + '/' + id;

    this.currPath = menu.path;
  },
  currPath: 'info',
  setCurrPath: function (path) {
    var pathRoot = path.split('/')[1];
    this.currPath = pathRoot;
  }
});
module.exports = vm;