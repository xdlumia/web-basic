/*
 * @Author: web.王晓冬
 * @Date: 2020-03-20 18:25:34
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-03 13:51:47
 * @Description: file content
 */
const MOCK_ADDRESS = ''

export default {
  __mockAddress: MOCK_ADDRESS,
  /* =============人机结合API=========== */
  // 可选客服人员
  demoUser: {
    'url': '/demo/user',
    'methods': 'get',
    'mock': false,
    'showMsg': false
  },
  // 可选客服人员
  projectUserUsers: {
    'url': 'ProjectUser/users',
    'methods': 'post',
    'mock': false,
    'showMsg': false
  },
  // 已选客服人员
  projectGroupDetail: {
    'url': '/ProjectGroup/detail/{groupId}',
    'mock': false,
  },
  // 新增修改项目组
  projectGroupAddOrUpdate: {
    'url': '/ProjectGroup/addOrUpdate',
    'methods': 'post',
    'mock': false,
  },
  // 删除项目组
  projectGroupDel: {
    'url': '/ProjectGroup/del/{groupId}',
    'methods': 'del',
    'mock': false,
  },
  // 项目组分页条件查询
  projectGroupPage: {
    'url': '/ProjectGroup/page',
    'methods': 'post',
    'mock': false,
    'showMsg': false
  },


  // 新增修改规则
  aiRuleAddOrUpdate: {
    'url': '/AiRule/addOrUpdate',
    'mock': false,
    'methods': 'post'
  },

  // 规则详情
  aiRuleDetail: {
    'url': '/AiRule/detail/{ruleId}',
    'mock': false,
    'methods': 'get'
  },

  // 规则删除
  aiRuleDel: {
    'url': '/AiRule/del/{ruleId}',
    'mock': false,
    'methods': 'del'
  },

  // 规则分页条件查询
  aiRulePage: {
    'url': '/AiRule/page',
    'mock': false,
    'methods': 'post',
    'showMsg': false
  },
  // 规则列表上下移动接口
  aiRuleUpdateRank: {
    'url': '/AiRule/updateRank',
    'mock': false,
    'methods': 'post'
  },
  // 规则列表上下移动接口
  aiDepartmentList: {
    'url': '/AiDepartment/list',
    'mock': false,
  },

  // 登陆验证
  validUser: {
    'url': '/ValidUser',
    'mock': false,
    'methods': 'post'
  },

}
