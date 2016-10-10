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
  }
});
module.exports = vm;