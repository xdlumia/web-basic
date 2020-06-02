/*
 * @Author: web.王晓冬
 * @Date: 2020-03-17 17:49:21
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-02 09:48:04
 * @Description: file content
 */
import components from './components/index';
import './style/app.scss';
import './utils/verify';
import './utils/element-extend';
import filters from './utils/filters.js';
import directives from './utils/directives.js';
import utils from './utils/utils';
import local from './utils/localStrong';
import api from './api';
// mixin内容
import authCodes from './mixins/authCodes';

const eWebBasic = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$util = utils;
  Vue.prototype.$api = api;
  Vue.prototype.$local = local;
  Vue.mixin(authCodes);
  // 添加过滤器
  Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
  // 添加自定义指令
  Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))
};


// const eWebBasic = {
//   install(Vue) {
//     // 安装组件
//     components.map(item => Vue.component(item.name, item))
//     Vue.prototype.$util = utils;
//     Vue.prototype.$api = api;
//     Vue.prototype.$local = local;
//     Vue.mixin(authCodes);
//   },
// };

export {
  eWebBasic,
  api
};
