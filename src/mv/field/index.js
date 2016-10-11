/**
 * Created by linmingxiong on 16/9/27.
 */

var vm = avalon.define({
  $id: 'field',
  data: [],
  pageConfig:{showPages:5},
  request: function () {
    avalon.ajax({
      url: apiPath+'field/'+this.id,
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
    },
    addData:function(){
        vmAddFieldDialog.open();
    }
});

/*一级弹层，添加字段 vm*/
var vmAddFieldDialog = avalon.define({
  $id: 'addFieldDialog',
  basicInfo: {
    name: '姓名',
    code: 'username',
    fGroup: 'remark',
    cType: '输入框',
    dType: '字符型',
    isRequired:'0',
    default:'默认值'      
  },
  interfaceAttr:{
     list:'a,b,c,d',
     rule:'a,b,c,d',
     conditions:'条件条件条件...',
     text:'文本文本...'
  },
  config: {
    id: 'addfield',
    title: '添加字段',
    show: false,
    showFooter:false,
    mWidth:"1000",
    content: require('./addField.html'),
    ok: function () {
      vmAddFieldDialog.submit();
    }
  },
  fieldGroup:{
     data: [{label:'111',value:1},{label:'222',value:2},{label:'333',value:3}],
     currValue:2,
     onSelect:function(v){
        vmAddFieldDialog.basicInfo.fGroup = v;
     }
  },
  controlType:{
     data: [{label:'aaa',value:1},{label:'bbb',value:2},{label:'ccc',value:3}],
     currValue:2,
     onSelect:function(v){
        vmAddFieldDialog.basicInfo.cType = v;
     }
  },
  dataType:{
     data: [{label:'AAA',value:1},{label:'BBB',value:2},{label:'CCC',value:3}],
     currValue:2,
     onSelect:function(v){
        vmAddFieldDialog.basicInfo.dType = v;
     }
  },
  cancelHandle:function(){
    vmAddFieldDialog.submit();
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
  },
    validate: {
        onError: function (reasons) {
            console.log(reasons);
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
/*二级弹层，设置选项列表 vm*/
var vmsetListDialog = avalon.define({
    $id:'setListDialog',
    config: {
      id: 'setlist',
      title: '字段选项',
      show: false,      
      mWidth:"600",
      content: require('./setList.html'),
      ok: function () {
         
        vmsetListDialog.submit();
      }
    },
    hide: function () {
      this.config.show = false;
    },
    open: function () {
      this.config.show = true;
    },
    fieldList:{
        getMethod:"0",
        sysList0:"",
        sysList1:"",
        sysList2:"",
    },
    sysCode:{
     data: [{label:'111',value:1},{label:'222',value:2},{label:'333',value:3}],
     currValue:2,
     onSelect:function(v){
        vmsetListDialog.fieldList.sysList0 = v;
     }
  }
});
/*二级弹层，设置校验规则 vm*/
var vmsetRulesDialog = avalon.define({
    $id:'setRulesDialog',
    config: {
      id: 'setrules',
      title: '校验规则',
      show: false,
      content: require('./setRules.html'),
      ok: function () {            
        vmsetRulesDialog.submit();
      }
    },
    commonRulesA:[],
    commonRulesB:[],
    advanceRules:[],
    js:"",
    reg:"",
    length:"",
    getCommonRules:function(){
        console.log(vmsetRulesDialog.commonRulesA.sort().join(";"));
    },
    hide: function () {
      this.config.show = false;
    },
    open: function () {
      this.config.show = true;
    }
});

module.exports = vm;