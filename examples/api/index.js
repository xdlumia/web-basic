/*
 * @Author: web.王晓冬
 * @Date: 2020-03-20 18:26:00
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-03 13:52:46
 * @Description: file content
 */


import {
  api
} from '../../package/index';
import axios from 'axios'


import serviceApi from './service-api.js'

// 可以对axios 配置
// axios.defaults.baseURL = '/apis/console/Service/';
axios.defaults.baseURL = ' https://easy-mock.com/mock/5a1b7f90fc9bad5c3ee4f1a1';
axios.defaults.timeout = 200000
api.registry({
  serviceApi
}, false)
