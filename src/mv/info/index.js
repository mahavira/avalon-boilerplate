/**
 * Created by linmingxiong on 16/9/27.
 */
import $ from '../../../bower_components/jquery/dist/jquery';
var vm = avalon.define({
  $id: 'info',
  data: {},
  id:0,
  request: function () {
    avalon.ajax({
      url: apiPath+'info/'+this.id,
      success: function (data, textStatus, XHR) {
        vm.data = data;
      }
    });
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
        console.log('全部通过');
        //avalon.ajax({
        //  url:apiPath+'info/'+this.id,//调用修改的接口
        //  success:function(data, textStatus, XHR){
        //    vm.data = data;
        //  }
        //});
        $('form').submit();
      }
    }
  }
});
module.exports = vm;

