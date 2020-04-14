/*
 * @Author: web.王晓冬
 * @Date: 2020-03-20 18:26:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-04-14 14:41:39
 * @Description: file content
 */


import {
  api
} from '../../package/index';
import axios from 'axios'


import serviceApi from './service-api.js'
console.log(api);
// 可以对axios 配置
// axios.defaults.baseURL = '/apis/console/Service/';
// axios.defaults.baseURL = 'http://192.168.1.112:8080/console/Service/';
axios.defaults.timeout = 200000
api.registry({
  serviceApi
}, false)
