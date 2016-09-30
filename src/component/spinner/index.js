/**
 * Created by ff on 2016/9/29.
 */
require('./style.css');
avalon.component('ms-spinner', {
    template: require('./temp.html'),
    defaults: {
        val: 10,
        variable: 5,
        obj: {
            placeholder: "请输入数字",
            min: 10 ,//设置为非数字格式unlimit表示无最小限制，如果有限制请修改为限制的最小值
            max: 'unlimit'//设置为非数字格式unlimit表示无最大限制，如果有限制请修改为限制的最大值
        },
        minusClickHandle: function () {
            var val = parseInt(this.val);
            var min=parseInt(this.obj.min);
            if (!isNaN(min)) {
                if (val - this.variable < this.obj.min) {
                    this.val = this.obj.min;
                } else {
                    this.val -= parseInt(this.variable);
                }
            }else{
                this.val -= parseInt(this.variable);
            }
        },
        addClickHandle: function () {
            var val = parseInt(this.val);
            var max=parseInt(this.obj.max);
            if (!isNaN(max)) {
                if (val + this.variable > this.obj.max) {
                    this.val = this.obj.max;
                } else {
                    this.val += parseInt(this.variable);
                }
            }else{
                this.val += parseInt(this.variable);
            }
        },
        keyUpHandle: function () {
            var val = parseInt(this.val);
            if (isNaN(val)) {
                this.val = this.obj.min;
                alert('请输入数字类型');
            } else {
                if(!isNaN(parseInt(this.obj.min))&&val < this.obj.min){
                    this.val = this.obj.min;
                }else if(!isNaN(parseInt(this.obj.max))&&val > this.obj.max){
                    this.val = this.obj.max;
                }else{
                    this.val = val;
                }

            }
        }
    }
});