/**
 * Created by ff on 2016/9/29.
 */
require('./style.css');
avalon.component('ms-inputfile', {
    template: require('./temp.html'),
    defaults: {
        name:'用户名',
        iconshow:false,
        inputType:'text',
        inputClass:[],
        placeholder:'',
        lableCol:['col-sm-3'],
        inputParCol:['col-sm-9'],
        lableShow:true,
        classType:function(){
            switch(this.type){
                case 'success':
                    return 'has-success';
                    break;
                    case 'error':
                    return 'has-error';
                    break;
                    case 'warning':
                    return 'has-warning';
                    break;
                
            }
            return 'suc';
        },
        iconType:function(){
            switch(this.type){
                case 'success':
                    return 'glyphicon-ok';
                    break;
                    case 'error':
                    return 'glyphicon-remove';
                    break;
                    case 'warning':
                    return 'glyphicon-warning-sign';
                    break;
                
            }
        }
    }
    
});
