/**
 * Created by linmingxiong on 16/9/27.
 */

var vm = avalon.define({
  $id: 'data',
  data: [],
  request: function () {
    avalon.ajax({
      url: apiPath+'data',
      success: function (data, textStatus, XHR) {
        vm.data = data;
      }
    });
  }
});

module.exports = vm;