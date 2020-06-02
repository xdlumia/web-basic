/*
 * @Author: web.王晓冬
 * @Date: 2020-03-19 10:29:17
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-02 09:51:06
 * @Description: file content
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import {
  eWebBasic
} from '../package/index';
// import {
//   eWebBasic
// } from '../lib/e-web-basic.umd';
import './api'

Vue.use(ElementUI, {
  size: 'mini'
});
Vue.use(eWebBasic);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
