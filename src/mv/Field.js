/**
 * Created by linmingxiong on 16/9/27.
 */

var vm = avalon.define({
  $id: 'field',
  data: [],
  request: function () {
    avalon.ajax({
      url: apiPath+'field',
      success: function (data, textStatus, XHR) {
      }
    });
  }
});
module.exports = vm;