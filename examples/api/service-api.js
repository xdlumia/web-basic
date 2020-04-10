/*
 * @Author: web.王晓冬
 * @Date: 2020-03-20 18:25:34
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-03-23 18:27:22
 * @Description: file content
 */
const MOCK_ADDRESS = '/mock/5de4c965e8c6606de89f330a/operlogService'

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============操作日志start=========== */
  // 查看详细信息
  logInfo: {
    'url': '/log/info/{id}',
    'mock': false
  },

  // 获取列表
  logList: {
    'url': '/log/list',
    'mock': false
  },

  // 业务系统查询日志的接口
  logQueryList: {
    'url': '/log/queryList',
    'mock': false
  },

  // 保存
  logSave: {
    'url': '/log/save',
    'mock': false,
    'methods': 'post'
  },

  // 批量保存
  logSaveBatchLogs: {
    'url': '/log/saveBatchLogs',
    'mock': false,
    'methods': 'post'
  },

  // 更新平台日志
  logUpdatePlatformLog: {
    'url': '/log/updatePlatformLog',
    'mock': false,
    'methods': 'post'
  },
  /* =============操作日志end=========== */

  /* =============RocketMQ失败重试start=========== */
  // 重试失败消息
  rocketMQRetryFailedMessage: {
    'url': '/rocketMQ/retryFailedMessage/{className}',
    'mock': false,
    'methods': 'post'
  },
  /* =============RocketMQ失败重试end=========== */

  /* =============服务健康检查start=========== */
  // 检查服务健康状况
  healthCheck: {
    'url': '/ws/health/check',
    'mock': false
  },
  /* =============服务健康检查end=========== */

  /* =============文件压缩下载（日志和配置文件）start=========== */
  // 根据端口号压缩并下载指定类型文件
  runlogCompressAndDownload: {
    'url': '/ws/runlog/compressAndDownload',
    'mock': false
  }
  /* =============文件压缩下载（日志和配置文件）end=========== */
}