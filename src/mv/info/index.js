/**
 * Created by linmingxiong on 16/9/27.
 */

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