'use strict';
require("./style.css");
/**
 * 是否闰年
 */
function isLeapYear(year) {
  return (year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0));
}
/**
 * 常规月份中的天数
 * @type {Array}
 */
var monthDays = [31, 28, 31, 30, 31, 31, 30, 31, 30, 31, 30, 31];

/**
 * 当前显示类型,按日\月\年显示,
 * @type {string}
 */
const YEAR = 'YEAR';
const MONTH = 'MONTH';
const DAY = 'DAY';
/**
 * 按日
 */
function getDate(y, m, d) {
  var date = new Date(y, m, d);
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var maxDay = monthDays[month];
  //如等于二月份
  if (month == 1)
    maxDay += isLeapYear(year);
  var firstDay = (new Date(year, month, 1)).getDay();//当月第一天星期几
  return {
    date, year, month, day, firstDay, maxDay
  }
}
avalon.component('ms-datepicker', {
  template: require('./temp.html'),
  defaults: {
    l: require('./lang-zh-cn'),
    currShowType: DAY,
    YEAR, MONTH, DAY,
    currDate: {},
    show:false,
    onInit: function () {
      var dt = new Date('2016-10-31');
      this.currDate = getDate(dt.getFullYear(), dt.getMonth(), dt.getDate());

      document.addEventListener('click',function () {
        this.show = false;
      }.bind(this));

    },
    onFocus:function () {
      this.show= true;
    },
    /**
     * 前进后退月份
     * @param mStep number
     */
    byStep: function (mStep) {
      var year = this.currDate.year;
      var month = this.currDate.month;
      var day = this.currDate.day;

      if (this.currShowType == DAY) {
        month += mStep;

        year = year + Math.floor(month / 12);
        if (month > 11) {
          month = month % 12;
        } else if (month < 0) {
          month = 12 - Math.abs(month % 12);
        }

        var maxDay = monthDays[month] + (month == 1 ? isLeapYear(year) : 0);
        if (day > maxDay)
          day = maxDay;

        this.currDate = getDate(year, month, day);
      } else {

        var num = 3 * 6;
        switch (mStep) {
          case 1:
            year += num;
            break;
          case -1:
            year -= num;
        }

        this.currDate = getDate(year, month, day);
      }
    },
    /**
     * 如索引小于等于当月第一天的星期几或大于等于当前最后一天则返回空
     * @param rowIndex 表格索引行
     * @param colIndex 表格索引列
     * @returns number|undefined
     */
    getDay: function (rowIndex, colIndex) {
      var n = colIndex + 1 + rowIndex * 7;
      if (n <= this.currDate.firstDay)
        return;
      if (n > this.currDate.maxDay + this.currDate.firstDay)
        return;
      return n - this.currDate.firstDay;
    },
    getMonth: function (rowIndex, colIndex) {
      return colIndex + rowIndex * 2;
    },
    getYear: function (rowIndex, colIndex) {
      return this.currDate.year + (colIndex + rowIndex * 3) - 10;
    },

    isToDay: function (rowIndex, colIndex) {
      var now = new Date();
      var curr = this.currDate;

      if (this.getDay(rowIndex, colIndex) == now.getDate()
        && curr.month == now.getMonth()
        && curr.year == now.getFullYear())
        return true;

      return false;
    },
    isCurrDay: function (rowIndex, colIndex) {
      var curr = this.currDate;
      if (this.getDay(rowIndex, colIndex) == curr.day)
        return true;

      return false;
    },

    changeShowType: function () {
      this.currShowType = (this.currShowType == DAY ? MONTH : YEAR);
    },
    isYMD: function (v) {
      return v == this.currShowType;
    },
    clickYMD: function (type, rowIndex, colIndex) {
      var year = this.currDate.year,
        month = this.currDate.month,
        day = this.currDate.day;

      switch (type) {
        case DAY:
          var _day = this.getDay(rowIndex, colIndex);
          if (day)
            day = _day;
          break;
        case MONTH:
          month = this.getMonth(rowIndex, colIndex);
          this.currShowType = DAY;
          break;
        case YEAR:
          year = this.getYear(rowIndex, colIndex);
          this.currShowType = MONTH;
          break;
      }
      this.currDate = getDate(year, month, day);
      this.show=false;
    },
    onStopPropagation: function (e) {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
    }
  }
});