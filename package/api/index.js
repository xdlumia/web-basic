/*
 * @Author: web.王晓冬
 * @Date: 2020-03-20 18:07:03
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-03-24 10:35:08
 * @Description: file content
 */
import ApiEmitter from './ApiEmitter'

class APIConfig {
  // isMircroService 是否是微服务
  registry(config,isMircroService) {
    Object.assign(this, ApiEmitter(config,isMircroService))
  }
}

let apiConfig = new APIConfig()

export default apiConfig