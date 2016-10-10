/**
 * Created by linmingxiong on 16/9/27.
 */
import $ from '../../../bower_components/jquery/dist/jquery';

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
  },
  spinnerConfig:{
    id: 'bbb'
  },
  datepickerConfig:{
    id:'ccc'
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
  },
  validate: {
    onError: function (reasons) {
      //console.log(reasons);
      reasons.forEach(function (reason) {
        console.log(reason.getMessage())
      })
      $(this).siblings('span').text(reasons[0].getMessage());
    },
    onSuccess:function(){
      //$(this).siblings('span').text('验证成功');
      $(this).siblings('span').text('');
    },
    onValidateAll: function (reasons) {
      if (reasons.length) {
        console.log('有表单没有通过')
      } else {
        console.log('全部通过')
      }
    }
  }
});

module.exports = vm;