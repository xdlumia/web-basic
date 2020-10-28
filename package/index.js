/*
 * @Author: web.王晓冬
 * @Date: 2020-03-17 17:49:21
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-28 17:25:04
 * @Description: file content
 */
// import components from './components/index';
var components = require('./components/index').default;
import './style/index.less';
// import './utils/verify';
// import './utils/element-extend';
// import filters from './utils/filters.js';
// import directives from './utils/directives.js';
// import utils from './utils/utils';
// import local from './utils/localStrong';
// import api from './api';
var api = require('./api').default;

// // mixin内容
// import authCodes from './mixins/authCodes';

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  // Vue.prototype.$util = utils;
  Vue.prototype.$api = api;
  // Vue.prototype.$local = local;
  // Vue.mixin(authCodes);
  // // 添加过滤器
  // Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
  // // 添加自定义指令
  // Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))
};
let comps = components.reduce((obj,row)=>{
  obj[row.name] = row
  return obj
},{})

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
console.log(components);
const API = {
  install,
  api,
  ...comps
};
// module.exports.default = module.exports = API;
// export default API;

// export {
//   // form,
//   // formItem,
//   // chatRecord,
//   // table,
//   // sideBar,
//   install,
//   api
// };
