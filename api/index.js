/**
 * Created by linmingxiong on 16/9/28.
 */
function api(app) {
  app.get('/api/info', function response(req, res) {
    res.json({
      "id": 2,
      "name": "会员属性扩展模型" + Math.random(),
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
      {
        "id": 2,
        "name": "会员属性扩展模型" + Math.random(),
        "code": "xxx",
        "remark": "XXXXXXXXX",
        "type": "XXX",
        "pid": "1111",
        "ptable": "XXX"
      },{
        "id": 2,
        "name": "会员属性扩展模型" + Math.random(),
        "code": "xxx",
        "remark": "XXXXXXXXX",
        "type": "XXX",
        "pid": "1111",
        "ptable": "XXX"
      },{
        "id": 2,
        "name": "会员属性扩展模型" + Math.random(),
        "code": "xxx",
        "remark": "XXXXXXXXX",
        "type": "XXX",
        "pid": "1111",
        "ptable": "XXX"
      }
    ]);
    res.end();
  });

  app.get('/api/field', function response(req, res) {
    res.json([
      {
        "id": 2,
        "name": "会员属性扩展模型" + Math.random(),
        "code": "xxx",
        "remark": "XXXXXXXXX",
        "type": "XXX",
        "pid": "1111",
        "ptable": "XXX"
      },{
        "id": 2,
        "name": "会员属性扩展模型" + Math.random(),
        "code": "xxx",
        "remark": "XXXXXXXXX",
        "type": "XXX",
        "pid": "1111",
        "ptable": "XXX"
      }
    ]);
    res.end();
  });
}
module.exports = api;