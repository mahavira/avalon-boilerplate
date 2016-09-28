/**
 * Created by linmingxiong on 16/9/28.
 */
avalon.component('ms-pager', {
  template: '<div><input type="text" ms-duplex-number="@num"/><button type="button" ms-click="@onPlus">+++</button></div>',
  defaults: {
    num: 1,
    onInit: function () {
      log('onInit')
    },
    onReady: function () {
      log('onReady')
    },
    onViewChange: function () {
      log('onViewChange')
    },
    onDispose: function () {
      log('onDispose')
    },
    onPlus: function () {
      this.num++;
    }
  },
  getTemplate: function (vm, template) {
    return template.replace('ms-on-click', 'ms-on-mousenter')
  }
});