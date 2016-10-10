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
    data: [],
    map: {value: 'value', label: 'label'},
    open: false,
    disabled: false,
    multiple: false,
    onInit: function () {
      document.addEventListener('click', function () {
        this.open = false;
      }.bind(this));
    },
    currValueToArray: function () {
      if (Object.prototype.toString.call(this.currValue) !== '[object Array]')
        this.currValue = [this.currValue];
    },
    getCurrText: function () {
      var labels = pluck(filter(this.data, function (op) {
        return this.hasValue(op);
      }.bind(this)), this.map.label);

      return labels.length ? labels.join() : this.defaultText;
    },
    hasValue: function (op) {
      this.currValueToArray();
      return this.currValue.indexOf(op[this.map.value]) >= 0;
    },
    toggle: function (e) {
      this.open = !this.open;
    },
    handleSelect: function (op) {
      this.currValueToArray();
      var mapValue = this.map.value;
      if (!this.multiple) {
        if (!this.currValue.length)
          this.currValue.push(op[mapValue]);
        else
          this.currValue.splice(0, this.currValue.length, op[mapValue]);
      } else {
        if (this.hasValue(op)) {
          this.currValue.splice(this.currValue.indexOf(op[mapValue]), 1);
        } else {
          this.currValue.push(op[mapValue]);
        }
      }
      if (Object.prototype.toString.call(this.onSelect) === '[object Function]'){
        this.onSelect(this.currValue);
      }
      this.open = false;
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