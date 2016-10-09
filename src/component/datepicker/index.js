/**
 * Created by ff on 2016/9/30.
 */
require('./style.css');
import $ from '../../../bower_components/jquery/dist/jquery';
avalon.component('ms-datepicker',{
    template:require('./temp.html'),
    defaults:{
        show:false,
        Isvalid:true,
        val:'',
        init:function(){
            //var nstr=new Date(); //当前Date
            var nstr=new Date(this.yearAndMonth+'-01'); //当前Date
            var ynow=nstr.getFullYear(); //年份
            var mnow=nstr.getMonth(); //月份
            //var dnow=nstr.getDate(); //今日日期
            var dnow=this.val.substring(8,10);
            var n1str=new Date(ynow,mnow,1); //当月第一天Date
            var firstday=n1str.getDay(); //当月第一天星期几
            function is_leap(year){//是否为闰年
                return (year%100==0?(year%400==0?1:0):(year%4==0?1:0));
            }
            var sep=is_leap(ynow)+28;
            var m_days=new Array(31,sep,31,30,31,30,31,31,30,31,30,31); //各月份的总天数
            var tr_str=Math.ceil((m_days[mnow] + firstday)/7); //表格所需要行数
            var htm='';

            for(var i=0;i<tr_str;i++) { //表格的行
                htm+="<tr>";
                for(var k=0;k<7;k++) { //表格每行的单元格
                    var idx=i*7+k; //单元格自然序列号
                    var date_str=idx-firstday+1; //计算日期
                    (date_str<=0 || date_str>m_days[mnow]) ? date_str="&nbsp;" : date_str=idx-firstday+1; //过滤无效日期（小于等于零的、大于月总天数的）
                    //打印日期：今天底色为蓝
                    date_str==dnow ? htm+= "<td align='center' bgcolor='#31C5F1' font-color='white'>" + date_str + "</td>" :htm+= "<td align='center'>" + date_str + "</td>";
                }
                htm+="</tr>"; //表格的行结束
            }

            $('tfoot').empty().append(htm); //表格结束
            var self=this;
            function chooseHandle(el){
                var $el=$(el);
                var nday=$el.text();
                console.log(nday)
                if(nday==' '){
                    return false;
                }else{
                    self.val=self.yearAndMonth+'-'+(nday<10?"0"+nday:nday);
                    self.show=false;
                }

            }
            $('tfoot td').click(function(){
                chooseHandle(this);
            })
        },
        onInit: function () {
            this.turnHandle();
        },
        open:function(){
            this.show=true;
            this.turnHandle();
            this.yearAndMonthShow();
            this.init();
        },
        valideHandle:function(){
            var reg=/^([1-9][0-9]{3})-(0\d{1}|1[0-2])-(0\d{1}|1\d{1}|2\d{1}|3[0-1])$/;
            if(!reg.test(this.val)){
                this.Isvalid=false;
            }else{
                this.Isvalid=true;
                this.yearAndMonthShow();
                this.init();
            }

        },
        turnHandle:function(){
            var taday=new Date();
            var ynow=taday.getFullYear(); //年份
            var mnow=taday.getMonth()+1; //月份
            var dnow=taday.getDate(); //今日日期
            var timeFormate=ynow+'-'+(mnow<10?"0"+mnow:mnow)+'-'+(dnow<10?"0"+dnow:dnow);
            this.val=timeFormate;
        },
        chooseHandle:function(){
            this.show=false;
        },
        yearAndMonth:'',
        yearAndMonthShow:function(){
            this.yearAndMonth=(this.val).substring(0,7);
        },
        monMinus:function(){
            var nyear=this.yearAndMonth.substring(0,4);
            var nmon=this.yearAndMonth.substring(5,7);
            nmon=parseInt(nmon);
            if(nmon>1){
                nmon--;
            }else{
                nmon=12;
                nyear--;
            }
            nmon<10?nmon="0"+nmon:nmon=nmon;
            var newyearAndMonth=nyear+'-'+nmon;
            this.yearAndMonth=newyearAndMonth;
            this.init();
        },
        monAdd:function(){
            var nyear=this.yearAndMonth.substring(0,4);
            var nmon=this.yearAndMonth.substring(5,7);
            nmon=parseInt(nmon);
            if(nmon>11){
                nmon=1;
                nyear++;
            }else{
                nmon++;
            }
            nmon<10?nmon="0"+nmon:nmon=nmon;
            var newyearAndMonth=nyear+'-'+nmon;
            this.yearAndMonth=newyearAndMonth;
            this.init();

        }
    }
});
