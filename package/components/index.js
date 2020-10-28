/*
 * @Author: web.王晓冬
 * @Date: 2020-03-17 17:16:37
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-28 15:54:14
 * @Description: 收集公共组件  公共组件入口必须是index.vue命名 并且必须正确命名name
 */
const files = require.context('.', true, /\index.vue$/)
export default files.keys().map(key => {
  let comp = files(key).default
  if (!comp.name) {
    var name = key.split('/')[1]

    comp.name = name
  }
  comp.install = function (Vue) {
    Vue.component(comp.name, comp);
  };
  return comp
})
