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
  }
});
module.exports = vm;