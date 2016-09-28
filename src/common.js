/**
 * Created by linmingxiong on 16/9/27.
 */
window.log = function () {
  if (window["console"]) {
    console.log.apply(console, arguments);
  }
};
window.apiPath = '/api/';