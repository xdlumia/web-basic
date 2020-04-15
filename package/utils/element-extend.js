/*
 * @Author: web.闫超
 * @Date: 2018-09-14 18:34:55
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-04-15 14:43:26
 * @Description: elementUI扩展入口
 */
import {
  Input,
  Image,
  Dialog,
  InputNumber
} from 'element-ui';
/**
 * 默认设置 el-input textarea 类型下的最大长度是300 text类型最大长度是32
 * maxlength是通过attrs传递给实际的Input,暂时找不到任何合适的地方去修改attrs，因此只能覆盖下render方法，在render之前修改下
 */
Input.render = (function (old, defaultMaxLength) {
  return function () {
    if (this.$attrs.placeholder === undefined) {
      this.$attrs.placeholder = '请输入内容';
    }
    if (this.$attrs.maxlength === undefined) {
      this.$attrs.maxlength = this.type == 'text' ? 20 : defaultMaxLength;
    }

    return old.apply(this, arguments);
  };
}(Input.render, 200));

// 修改element ui 默认参数
Image.props.fit = {
  default: 'cover',
  type: String
}

/**
 * 修改默认值“close-on-click-modal”，默认情况下点击modal不关闭dialog
 */
Dialog.props.closeOnClickModal.default = false;
Dialog.props.closeOnPressEscape.default = false;
Dialog.props.appendToBody.default = true;
Dialog.props.modalAppendToBody.default = true;
Dialog.props.top.default = '15px';

/**
 * InputNumber控制精度时，小数位全是0的时候，没必要强制显示小数位
 */
InputNumber.computed.currentInputValue = function currentInputValue() {
  const currentValue = this.currentValue;
  if (typeof currentValue === 'number' && this.precision !== undefined) {
    return currentValue.toFixed(this.precision);
  } else {
    return currentValue;
  }
};
