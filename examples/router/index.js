/*
 * @Author: web.王晓冬
 * @Date: 2020-03-25 14:13:24
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-03-26 14:53:01
 * @Description: file content
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{
      title:'AI助手'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
