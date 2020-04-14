/*
 * @Author: web.王晓冬
 * @Date: 2020-03-24 16:45:27
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-04-14 14:58:54
 * @Description: request
 */
import axios from 'axios'


import {
  Message
} from 'element-ui'
import QS from 'querystring'
// GET 请求 params 序列化
axios.defaults.paramsSerializer = function (params) {
  return QS.stringify(params)
}

// 拦截器
axios.interceptors.request.use(config => {
  // config.headers.finger = window.localStorage.getItem('finger') || '';
  // config.headers.token = window.localStorage.getItem('token') || '';
  return config;
}, error => {
  Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(response => {
  const res = response.data;
  if (res.code === undefined) {
    return res
  }
  if (res.code == 402) {
    if (window.router && router.currentRoute.fullPath != '/login' && !router.currentRoute.query
      .token) {
      localStorage.loginRedirect = router.currentRoute.fullPath
      sessionStorage.setItem("loginRedirect", router.currentRoute.fullPath);
    }
    // TODO: 换个方式
    window.router && router.push({
      path: '/login'
    })
    return Promise.reject(res.msg);
  }
  // code==0 数据正常
  if (res.code != 0) {
    Message.error({
      message: res.msg,
      dangerouslyUseHTMLString: true,
      duration: 3000,
      showClose: true
    })
    return Promise.reject(res.msg);
  }

  // showMsg 写法兼容以前
  let showMsg = response.config.showMsg

  if (res.code == 0 && (showMsg !== undefined ? showMsg : response.config.method !== 'get')) {
    let msg = response.config.msg || res.msg
    if (msg) {
      Message.success({
        message: msg,
        duration: 3000,
        dangerouslyUseHTMLString: true,
        showClose: true
      });
    }
  }
  // 成功返回数据
  return res;
}, error => {
  error.__CANCEL__ || Message.error({
    message: error.message,
    duration: 3000,
    dangerouslyUseHTMLString: true,
    showClose: true
  })
  return Promise.reject(error)
})


let api = {};
const methods = {
  get: {
    isParams: true
  },
  delete: {
    isParams: true
  },
  post: {
    isParams: false
  },
  put: {
    isParams: false
  },
  patch: {
    isParams: false
  }
};

Object.keys(methods).forEach(item => {
  api[item] = function (url, params, config) {
    let data = methods[item].isParams ? {
      params: params,
      ...config
    } : params;
    return axios[item](url, data, config);
  }
})

api.del = api.delete

export default api;
