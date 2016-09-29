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
          vm.data = data;
      }
    });
  },
  chkAll:false,
  checkAll: function (e) {
        var checked = e.target.checked
        vm.data.forEach(function (el) {
            el.checked = checked
        })
    },
   checkOne: function (e) {
        var checked = e.target.checked
        if (checked === false) {
            vm.chkAll = false
        } else {//avalon已经为数组添加了ecma262v5的一些新方法
            vm.chkAll = vm.data.every(function (el) {
                return el.checked
            })
        }
    },
    getChecks:function(){
        var tmpArray = [];        
        avalon.each(vm.data, function(index, el){
             if(el.checked === true){
                tmpArray.push(index);
            }
        })
        return tmpArray;
    },
    delData:function(){
        var delArray = vm.getChecks();  
        if(delArray.length === 0){
            //若未选中，弹出请选择要删除的数据的对话框
            console.log("请选择要删除的数据");
            
        }
        else{
            console.log('删除的数据下标为：'+delArray.join(";"));        
            //弹出确定要删除吗？对话框，点击确定则执行vm.delRequest函数，向服务器请求删除操作；取消则关闭对话框。
            //vm.delRequest(delArray.join(";"));
        }        
    },
    delRequest:function(del){
        avalon.ajax({
          url: apiPath+'data'+"/?del="+del,
          success: function (data, textStatus, XHR) {
              vm.data = data;
          }
        });
    },
    editData:function(){        
        var editArray = vm.getChecks();  
        if(editArray.length !== 1){
            //若选项个数不等于1，弹出请选择1条待编辑的数据的 对话框
            console.log('请选择1条待编辑的数据');  
            
        }
        else {
            console.log('编辑的数据下标为：'+editArray);     
            //弹出确定要删除吗？对话框，点击确定则执行vm.delRequest函数，向服务器请求删除操作；取消则关闭对话框。
            //vm.delRequest(delArray.join(";"));
        }
    },
    editRequest:function(id){
        avalon.ajax({
          url: apiPath+'data'+"/?edit="+id,
          success: function (data, textStatus, XHR) {
              vm.data = data;
          }
        });
    }
});
module.exports = vm;