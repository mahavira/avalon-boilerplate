/**
 * Created by linmingxiong on 16/9/27.
 */
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
  },
  inputSucess:{
      name:'success',
      iconshow:true,
      lableShow:false,
      inputParCol:['col-sm-12'],
      type:'success'
  },
  input1:{
      name:'error',
      iconshow:true,
      placeholder:'信息错误',
      inputType:'password',
      type:'error'
  },
  input2:{
      isWarn:true,
      iconshow:true
  },
  input3:{
      name:'密 码',
      inputType:'password'
  } 
});
module.exports = vm;

