/**
 * Created by linmingxiong on 16/9/27.
 */
import $ from '../../../bower_components/jquery/dist/jquery';
var vm = avalon.define({
  $id: 'info',
  data: {name:1},
  request: function () {
    avalon.ajax({
      url: apiPath+'info',
      data:{name:'asd'},
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
        console.log('全部通过')
      }
    }
  }
});
module.exports = vm;

