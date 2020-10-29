/*
 * @Author: web.王晓冬
 * @Date: 2020-10-29 10:08:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-29 10:10:03
 * @Description: 聊天记录
 */
import Chat from './chat';

/* istanbul ignore next */
Chat.install = function(Vue) {
  Vue.component(Chat.name, Chat);
};

export default Chat;
