/**
 * 下拉选择器
 * onSelect 选择后回调
 */
var {filter, pluck} = require('lodash');
require('./style.css');
avalon.component('ms-dropdown', {
  template: require('./temp.html'),
  defaults: {
    currValue: [],
    defaultText: '请选择',
    currText: '',
    data: [],
    open: false,
    disabled: false,
    multiple: false,
    onInit: function () {
      document.addEventListener('click',function () {
        this.open = false;
      }.bind(this));
    },
    onReady: function () {
      this.setCurrValueToArray();
      this.setCurrText();
      log('onReady')
    },
    setCurrText: function () {
      var labels = pluck(filter(this.data, function (op) {
        return this.hasValue(op);
      }.bind(this)), 'label');

      this.currText = labels.length ? labels.join(',') : this.defaultText;
    },
    hasValue: function (op) {
        this.setCurrValueToArray()
      return this.currValue.indexOf(op.value) >= 0;
    },
    toggle: function (e) {
      this.open = !this.open;
      this.stopPropagation(e);
    },
    handleSelect: function (op) {
        this.setCurrValueToArray()
      if (!this.multiple) {
        if (!this.currValue.length)
          this.currValue.push(op.value);
        else
          this.currValue.splice(0, this.currValue.length, op.value);
      } else {
        if (this.hasValue(op)) {
          this.currValue.splice(this.currValue.indexOf(op.value), 1);
        } else {
          this.currValue.push(op.value);
        }
      }
      this.open = false;
      this.setCurrText();
      if (Object.prototype.toString.call(this.onSelect) === '[object Function]')
        this.onSelect(this.currValue);
    },
  setCurrValueToArray:function(){
      if (Object.prototype.toString.call(this.currValue) !== '[object Array]')
        this.currValue = [this.currValue];

  },
    stopPropagation: function (e) {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
    }
  }
});