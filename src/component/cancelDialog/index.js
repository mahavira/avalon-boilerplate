/**
 * Created by ff on 16/9/28.
 */
require('./style.css');
avalon.component('ms-canceldialog', {
  template: require('./temp.html'),
  defaults: {
    title: '',
    content: "确认删除？",
    show:true,
    onCLose:function () {
      log(this);
    },
    closeHandle:function () {
      this.show = false;
    },
    okHandle:function () {
      this.ok();
      this.show = false;
    }
  }
});