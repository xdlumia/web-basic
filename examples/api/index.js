/*
 * @Author: web.王晓冬
 * @Date: 2020-03-20 18:26:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-28 20:19:47
 * @Description: file content
 */


import webBasic from '../../package/index';

import axios from 'axios'

import serviceApi from './service-api.js'

// 可以对axios 配置
// axios.defaults.baseURL = '/apis/console/Service/';
axios.defaults.baseURL = 'http://192.168.4.147:3000/';
axios.defaults.timeout = 200000
webBasic.api.registry({
  serviceApi
}, false)
