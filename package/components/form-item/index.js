/*
 * @Author: web.王晓冬
 * @Date: 2020-10-29 10:08:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-29 10:12:57
 * @Description: FormItem
 */
import FormItem from './form-item';

/* istanbul ignore next */
FormItem.install = function(Vue) {
  Vue.component(FormItem.name, Chat);
};

export default FormItem;
