/**
 * Created by linmingxiong on 16/9/28.
 */
function api(app) {
  app.get('/api/info', function response(req, res) {
    res.json({
      "id":2,
      "name": "会员属性扩展模型"+Math.random(),
      "code": "xxx",
      "remark": "XXXXXXXXX",
      "type": "XXX",
      "pid": "1111",
      "ptable": "XXX"
    });
    res.end();
  });
    
  app.get('/api/data', function response(req, res) {
    res.json([
      {'checked':false,'PKValue':'382315','price':'18000','address':'吉林'},
      {'checked':false,'PKValue':'382316','price':'18000','address':'沈阳'},
      {'checked':false,'PKValue':'382317','price':'70000','address':'北京'},
      {'checked':false,'PKValue':'382318','price':'70000','address':'北京'},
      {'checked':false,'PKValue':'382319','price':'10000','address':'河北'}
    ]);
    res.end();
  });
    
   app.get('/api/field', function response(req, res) {
    res.json([
      {'code':'address','checked':false,'name':'楼盘所在地区','datatype':'LargeText','controllertype':'Text','isRequired':'否'},
      {'code':'LiveType','checked':false,'name':'直播类型','datatype':'MediumText','controllertype':'Radio','isRequired':'是'},
      {'code':'address','checked':false,'name':'楼盘所在地区','datatype':'LargeText','controllertype':'Text','isRequired':'否'},
      {'code':'address','checked':false,'name':'楼盘所在地区','datatype':'LargeText','controllertype':'Text','isRequired':'否'},
      {'code':'address','checked':false,'name':'楼盘所在地区','datatype':'LargeText','controllertype':'Text','isRequired':'否'}
      ]);
    res.end();
  });
}
module.exports = api;