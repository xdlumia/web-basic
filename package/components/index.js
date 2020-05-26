/*
 * @Author: web.王晓冬
 * @Date: 2020-03-17 17:16:37
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-05-26 15:12:16
 * @Description: 收集公共组件  公共组件入口必须是index.vue命名 并且必须正确命名name
 */
const files = require.context('.', true, /\index.vue$/)
export default files.keys().map(key => files(key).default)
