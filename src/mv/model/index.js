/**
 * Created by linmingxiong on 16/9/27.
 */

var vm = avalon.define({
  $id: 'modelList',
  id: 0,
  data: [],
  init: function () {
    this.request();
  },
  clickHandle: function (e) {
    this.id = e.id;
    var path = avalon.router.getLastPath().split('/')[1];
    location.hash = "#!/" + path + '/' + e.id
  },
  request: function () {
    avalon.ajax({
      url: apiPath + 'model.json',
      success: function (data, textStatus, XHR) {
        vm.data = data;
        if (!vm.id) {
          var path = location.hash.split('/')[2];
          path = path || 'info';
          location.hash = "#!/" + path + '/' + data[0].id
        }
      }
    });
  },
  openNewModelDialog: function () {
    vmNewModelDialog.open();
  },
  cancelDialogConfig:{
    id: 'aaaa',
    title: '',
    show: false,
    ok:function () {
      var _data=vm.data;
      for(var i in _data){
        if(_data[i].id==vm.id){
          vm.data.splice(i,1);
        }
      }
      var path = location.hash.split('/')[1];
      path = path || 'info';
      location.hash = "#!/" + path + '/' + _data[0].id;
    }
  },

  newCancelDialog:function(){
    this.cancelDialogConfig.show=true;
  }
});
vm.init();


var vmNewModelDialog = avalon.define({
  $id: 'newModelDialog',
  data: {
    name: 'abd',
    code: 'code',
    remark: 'remark',
    type: 'type'
  },
  config: {
    id: 'XXXx',
    title: '新建扩展模型',
    show: false,
    content: require('./newModel.html'),
    ok: function () {
      vmNewModelDialog.submit();
    }
  },
  submit: function () {
    this.hide()
  },
  hide: function () {
    this.config.show = false;
  },
  open: function () {
    this.config.show = true;
  }
});

module.exports = vm;