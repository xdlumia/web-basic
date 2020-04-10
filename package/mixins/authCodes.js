/*
 * @Author: web.王晓冬
 * @Date: 2020-04-02 11:01:10
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-04-02 11:30:06
 * @Description: 权限按钮
 */
import local from '../utils/localStrong'
export default {
  computed: {
    authCodes() {
      return local.fetch('authCodes') || []
    }
  }
}