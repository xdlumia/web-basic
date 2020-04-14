/*
 * @Author: web.王晓冬
 * @Date: 2020-03-20 18:25:34
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-04-14 14:43:46
 * @Description: file content
 */
const MOCK_ADDRESS = '/mock/5de4c965e8c6606de89f330a/operlogService'

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============操作日志start=========== */
  // 查看详细信息
  logInfo: {
    'url': '/log/info/{id}',
    'mock': false,
    'showMsg': false
  },

  // 获取列表
  logList: {
    'url': '/log/list',
    'mock': false,
    'showMsg': false
  },

  // 业务系统查询日志的接口
  logQueryList: {
    'url': '/log/queryList',
    'mock': false,
    'showMsg': false
  },

  // 保存
  logSave: {
    'url': '/log/save',
    'mock': false,
    'methods': 'post',
    'showMsg': false
  },

  // 批量保存
  logSaveBatchLogs: {
    'url': '/log/saveBatchLogs',
    'mock': false,
    'showMsg': false,
    'methods': 'post'
  },

  // 更新平台日志
  logUpdatePlatformLog: {
    'url': '/log/updatePlatformLog',
    'mock': false,
    'showMsg': false,
    'methods': 'post'
  },
  /* =============操作日志end=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  commit: {
    'url': 'http://git.kinfe.net/api/v4/projects/21/repository/commits?per_page=100&page=1&private_token=Wz6K47F6HKPp1RUYTKxd&ref=dev',
    'mock': false,
    'showMsg': true,
    'methods': 'get'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============文件压缩下载（日志和配置文件）end=========== */
}
