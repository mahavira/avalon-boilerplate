/**
 * Created by linmingxiong on 16/10/9.
 */
/**
 *
 * @param arr
 * @param separator 分隔符
 * @param name
 * @returns {string|*}
 */
avalon.filters.join = function (arr, separator, name) {
  separator = separator || ',';
  if (name) {
    var resultArr = [];
    avalon.each(arr, function (i, n) {
      resultArr.push(n[name]);
    })
    return resultArr.join(separator);
  }
  return arr.join(separator);
}