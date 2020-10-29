/*
 * @Author: web.王晓冬
 * @Date: 2020-03-17 17:16:37
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-29 10:14:08
 * @Description: 收集公共组件  公共组件入口必须是index.js命名 并且必须正确命名name
 */
const files = require.context('.', true, /\index.js$/)
export default files.keys().map(key => {
  let comp = files(key).default
  if (!comp.name) {
    var name = key.split('/')[1]
    comp.name = name
  }
  return comp
})
