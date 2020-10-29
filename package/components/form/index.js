/*
 * @Author: web.王晓冬
 * @Date: 2020-10-29 10:08:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-29 10:10:52
 * @Description: form
 */
import Form from './form';

/* istanbul ignore next */
Form.install = function(Vue) {
  Vue.component(Form.name, Chat);
};

export default Form;
