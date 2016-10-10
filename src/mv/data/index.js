/**
 * Created by linmingxiong on 16/9/27.
 */
import $ from '../../../bower_components/jquery/dist/jquery';

var vm = avalon.define({
  $id: 'data',
  data: [],
  loadingWrapShow:true,
  request: function () {
    avalon.ajax({
      url: apiPath+'data',
      success: function (data, textStatus, XHR) {
          vm.loadingWrapShow = false;
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
    addData:function(e){
        vmCreateDataDialog.open();
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
    },
    selectedF:"选项1",
    selectedS:"选项2",
    priceOptions:['选项1','选项2','选项3','选项4'],
    otherOptions:['选项1','选项2','选项3','选项4'],
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
var vmCreateDataDialog = avalon.define({
    $id:"createDataDialog",
    config: {
        id: 'createData',
        title: '新建数据',
        show: false,
        content: require('./createData.html'),
        ok: function () {
            vmCreateDataDialog.submit();
        }
    },
    dataInfo:{
        info:"adsfds",
        price:"",
        position:""
    },
    submit: function () {
        this.hide()
    },
    hide: function () {
        this.config.show = false;
    },
    open: function () {
        this.config.show = true;
    },
    setList:function(){
        vmsetListDialog.open();
    },
    setRules:function(){
        vmsetRulesDialog.open();
    }
});
module.exports = vm;