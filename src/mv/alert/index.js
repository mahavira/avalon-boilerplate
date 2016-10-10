/**
 * Created by linmingxiong on 16/9/28.
 */
/**
 * 使用方法

 */
require('./style.css');
var vm = avalon.define({
  $id: 'alert',
  title: "提示",
  content: "提示",
  type: 'success',
  show: false,
  def: null,
  closeHandle: function () {
    this.show = false;
    vm.def.reject();
  },
  okHandle: function () {
    this.show = false;
    vm.def.resolve();
  },
  open: function (obj) {
    if (obj.title)
      this.title = obj.title;
    if (obj.content)
      this.content = obj.content;
    if (obj.type)
      this.type = obj.type;
    if (obj.ok)
      this.ok = obj.ok;
    this.show = true;

    this.def = $.Deferred();
    return this.def;
  }
});
module.exports = vm;