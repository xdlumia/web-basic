/*
 * @Author: web.王晓冬
 * @Date: 2020-03-17 17:16:37
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-04-03 09:37:16
 * @axample: 
 //自定义表单验证
 <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
  <el-form-item
  label="邮箱"
  prop="name"
  :rule="[
          { required: true, message: '请输入邮箱', trigger: 'blur' },//end
          { type:'email', message: '邮箱地址错误' }
        ]
        ">
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
<el-form>
 */
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _getIterator from 'babel-runtime/core-js/get-iterator';
/**
 * @desc 公共验证方法
 * @author web-王晓冬
 * @date 2018年9月18号
 * @example 调用示例
:rules="{ type:'phone',message:'请输入正确的手机号'}"
 * */
// 验证正则
import Schema from 'async-validator';

const verify = {
  // 正整数#
  positiveNum(_rule, value, callback) {
    // /^\d+(?=\.{0,1}\d+$|$)/
    const reg = new RegExp('^(0|([1-9][0-9]*))$');
    if (!value || reg.test(value)) {
      callback();
    } else {
      return callback(new Error('只能是正整数'));
    }
  },//end
  // 年龄#
  age(_rule, value, callback) {
    const reg = new RegExp('^(0|[1-9]|[1-9][0-9]|1[0-1][0-9]|120)$');
    if (!value || reg.test(value)) {
      callback();
    } else {
      return callback(new Error('只能是0到120的正整数'));
    }
  },//end

  // 手机号验证#
  phone(_rule, value, callback) {
    // let reg = /^[1][0-9]{10}$/; //1开头的11位数字
    const reg = /^(\d|\+|-|\*|#){0,20}$/;
    if (!value || reg.test(value)) {
      callback();
    } else {
      return callback(new Error('手机号不正确，请重新输入！'));
    }
  },//end

  // 用户名验证#
  name(_rule, value, callback) {
    const reg = new RegExp('^([\u4E00-\u9FA5]|[a-zA-Z])+$');
    if (!value || reg.test(value)) {
      callback();
    } else {
      return callback(new Error('只能是中文或者英文！'));
    }
  },//end
  // 身份证验证#
  IDCard(_rule, value, callback) {
    const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    // validateIdCard(value)
    if (value === '' || reg.test(value)) {
      callback();
    } else {
      return callback(new Error('身份证号码不合法'));
    }
  },//end
  // 判断是否是数字#
  number(_rule, value, callback) {
    // /^\d+(?=\.{0,1}\d+$|$)/
    const reg = /^(\+|-)?\d+($|\.\d+$)/;
    if (!value || reg.test(value)) {
      callback();
    } else {
      return callback(new Error('只能是数字'));
    }
  },//end
  // 金额验证#
  price(_rule, value, callback) {
    const reg = /^((-)?([0-9]\d*(\.\d{1,2})?)|((0)|((-)?0(\.(([0-9][0-9]?)|(0[0-9]))))))$/;
    if (!value || reg.test(value) && value < 99999999999.99) {
      callback();
    } else {
      return callback(new Error('金额不合法,金额整数位不能超过11位,小数不能超过两位'));
    }
  },//end
  // 正整数验证#
  positiveFloat(_rule, value, callback) {
    const reg = /^(([1-9]\d*(\.\d{1,2})?)|(0(\.(([1-9][0-9]?)|(0[1-9])))?))$/;
    if (!value || reg.test(value)) {
      callback();
    } else {
      return callback(new Error('正小数不合法！'));
    }
  },//end
  // 银行卡验证#
  bankCard(_rule, value, callback) {
    const reg = /^[a-zA-Z0-9\*]{12,25}$/;
    if (!value || reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入12-25位银行卡号'));
    }
  },//end
  // 邮编验证#
  zipCode(_rule, value, callback) {
    const reg = /^[0-9]{6}$/;
    if (!value || reg.test(value)) {
      callback();
    } else {
      return callback(new Error('邮政编码格式不正确'));
    }
  },//end
  //  电话验证
  telePhone(_rule, value, callback) {
    if (!value || value.length >= 7 && value.length <= 20) {
      callback();
    } else {
      return callback(new Error('电话不合法'));
    }
  }
};

for (let key of Object.keys(verify)) {
  Schema.register(key, verify[key])
}
