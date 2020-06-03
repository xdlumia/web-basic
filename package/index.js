/*
 * @Author: web.王晓冬
 * @Date: 2020-03-17 17:49:21
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-03 18:40:22
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
const comps = {}
components.forEach(item => {
  comps[item.name] = item
})
const form = comps['e-form'] //e-form表单组件
const formItem = comps['e-form-item']
const chatRecord = comps['e-chat-record'] //聊天记录组件
const table = comps['e-table']
const sideBar = comps['e-side-bar']
const breadcrumb = comps['e-breadcrumb']
const search = comps['e-search']

export {
  form,
  formItem,
  chatRecord,
  table,
  sideBar,
  breadcrumb,
  search,
  eWebBasic,
  api
};
