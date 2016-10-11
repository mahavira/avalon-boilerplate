/**
 * Created by linmingxiong on 16/9/27.
 */

import $ from '../../../bower_components/jquery/dist/jquery';

require('./style.css');
var notice = require('../notice');
var alert = require('../alert');

var vm = avalon.define({
  $id: 'modelList',
  id: 0, //当前选中的模型
  pid: 0, //当前选中的模型类型
  data: [],
  searchText: '',
  request: function () {
    avalon.ajax({
      url: apiPath + 'model.json',
      data: {text: this.searchText},
      success: function (data) {
        vm.data = data;
        if (!vm.id) {
          vm.setDefaultItem();
        }
        vm.setCategoryByItemId(vm.id);
      }
    });
  },
  search: function () {
    if (!this.searchText) {
      notice.open({
        type: 'warning',
        content: '请输入关键词!'
      })
    } else {
      this.request()
    }
  },
  clickHandle: function (e) {
    this.id = e.id;
    var path = avalon.router.getLastPath().split('/')[1];
    location.hash = "#!/" + path + '/' + e.id
  },
  clickHandleCategory: function (e) {
    this.pid = e.id;
  },
  setDefaultItem: function () {
    var path = location.hash.split('/')[1];
    path = path || 'info';

    var _item = null;
    avalon.each(vm.data, function (j, el) {
      if (el.data.length) {
        _item = el.data[0];
        return false;
      }
    });
    vm.id = _item.id;
    location.hash = "#!/" + path + '/' + vm.id;
  },
  setCategoryByItemId: function (id) {
    var _activeCategory = null;
    avalon.each(vm.data, function (j, el) {
      avalon.each(el.data, function (i, elem) {
        if (elem.id == id) {
          _activeCategory = el;
          return false;
        }
      })
    });
    if (!_activeCategory) {
      this.setDefaultItem();
      this.setCategoryByItemId(this.id);
      return false;
    }
    this.pid = _activeCategory ? _activeCategory.id : 0;
  },

  onNewModel: function () {
    vmNewModel.open({
      options: this.data,
      pid: this.pid
    });
  },
  onNewModelBySimilar: function () {
    vmNewModel.open({
      options: this.data,
      pid: this.pid,
      id: this.id
    });
  },
  onDelete: function () {
    alert.open({
      title: '提示',
      content: '是否删除选中模型?'
    }).done(function () {

      avalon.ajax({
        url: apiPath + 'model/' + vm.id,
        type: 'DELETE',
        success: function (data, textStatus, XHR) {
          var _data = vm.data;
          for (var j in _data) {
            for (var i in _data[j].data) {
              if (_data[j].data[i].id == vm.id) {
                _data[j].data.splice(i, 1);
                vm.data = _data;
                break;
              }
            }
          }
          vm.setDefaultItem();
          notice.open({
            type: 'success',
            content: '删除成功!'
          })
        },
        error: function () {
          notice.open({
            type: 'danger',
            content: '删除错误!'
          })
        }
      });
    }).fail(function () {
      log('error')
    })
  },
  onAdd: function (data) {
    var _activeCategory = null;
    avalon.each(vm.data, function (j, el) {
      if (el.id == data.type) {
        _activeCategory = el;
        return false;
      }
    });
    _activeCategory.data.push(data);
  }
});
vm.request();
module.exports = vm;


/**
 * 新模型
 */
var vmNewModel = avalon.define({
  $id: 'newModel',
  data: {},
  typeConfig: {
    currValue: 0,
    data: [0, 0, 0, 0, 0],
    onSelect: function (v) {
      vmNewModel.data.type = v[0];
    }
  },
  config: {
    title: '新建扩展模型',
    show: false,
    content: require('./newModel.html'),
    ok: function () {
      vmNewModel.submit();
    }
  },
  submit: function () {
    this.hide();
    avalon.ajax({
      url: apiPath + 'model',
      type: 'POST',
      data: this.data,
      success: function (data) {
        vm.onAdd(data);
        notice.open({
          type: 'success',
          content: '增加成功!'
        })
      },
      error: function () {
        notice.open({
          type: 'danger',
          content: '增加错误!'
        })
      }
    });
  },
  hide: function () {
    this.config.show = false;
  },
  open: function (op) {
    var _data = [];
    avalon.each(op.options, function (j, el) {
      _data.push({
        value: el.id,
        label: el.name
      })
    });
    if (op.id) {
      avalon.ajax({
        url: apiPath + 'info/' + op.id,
        success: function (data, textStatus, XHR) {
          vmNewModel.data = data;
          vmNewModel.typeConfig.currValue = [data.type];
        }
      });
    } else {
      this.data = getNewModelField(op.pid);
    }
    this.typeConfig = {
      currValue: [op.pid],
      data: _data
    };
    this.config.show = true;
  },
  validate: {
    onError: function (reasons) {
      //console.log(reasons);
      reasons.forEach(function (reason) {
        console.log(reason.getMessage())
      })
      $(this).siblings('span').text(reasons[0].getMessage());
    },
    onSuccess:function(){
      //$(this).siblings('span').text('验证成功');
      $(this).siblings('span').text('');
    },
    onValidateAll: function (reasons) {
      if (reasons.length) {
        console.log('有表单没有通过')
      } else {
        console.log('全部通过')
      }
    }
  }
});

function getNewModelField(type) {
  return {
    type: type ? type : 0,
    name: '',
    code: '',
    remark: ''
  }
}