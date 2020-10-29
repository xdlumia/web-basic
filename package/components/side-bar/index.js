/*
 * @Author: web.王晓冬
 * @Date: 2020-10-29 10:08:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-29 10:12:18
 * @Description: SideBar
 */
import SideBar from './side-bar';

/* istanbul ignore next */
SideBar.install = function(Vue) {
  Vue.component(SideBar.name, Chat);
};

export default SideBar;
