/**
 * Created by linmingxiong on 16/9/28.
 */
/**
 * 使用方法
 notice.open({
     content: "请求成功!",
     type: 'warning'
   })
 */
require('./style.css');
var vm = avalon.define({
  $id: 'notice',
  content: "",
  type: 'success',
  show: false,
  isTimeout: true,
  timer: null,
  time: 3000,
  closeHandle: function () {
    this.show = false;
  },
  open: function (obj) {
    if (obj.content)
      this.content = obj.content;
    if (obj.type)
      this.type = obj.type;
    this.show = true;

    if (this.isTimeout) {
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>this.show = false, this.time)
    }
  }
});
module.exports = vm;