/**
 * Created by linmingxiong on 16/9/28.
 */
require('./style.css');
avalon.component('ms-dialog', {
  template: require('./temp.html'),
  defaults: {
    title: '提示',
    content: "",
    show:false,
    onCLose:function () {
      log(this)
    },
    closeHandle:function () {
      this.show = false;
    },
    okHandle:function () {
      this.ok();
    }
  }
});