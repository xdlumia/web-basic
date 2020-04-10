/*
 * @Author: web.王晓冬
 * @Date: 2020-03-19 10:29:17
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-03-27 19:06:51
 * @Description: file content
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import { eWebBasic } from '../package/index';
// import { eWebBasic } from '../lib/e-web-basic.umd';
console.log(ElementUI.Dialog.props.top);


import './api'

Vue.use(ElementUI, { size: 'mini' });
Vue.use(eWebBasic);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
