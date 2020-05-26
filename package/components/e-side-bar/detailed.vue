/*
 * @Author: web.王晓冬
 * @Date: 2020-05-21 15:44:37
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-05-21 16:21:51
 * @Description: 详情
*/

<template>
  <div class="detailde-warp">
    <el-button type="primary">导入到我的CRM</el-button>
    <el-button type="primary">暂不导入</el-button>
    <el-form :model="form" ref="form" label-width="100px" size="mini">
      <el-card class="mt10" shadow="never" v-for="item of formList" :key="item.title">
        <h3 class="f18 mb5">{{item.title}}</h3>
        <el-form-item :label="subItem.label" v-for="subItem of item.children" :key="subItem.prop">
          <el-input v-if="subItem.type =='text'" type="text" v-model="form[subItem.prop]"></el-input>
          <el-input
            v-else-if="subItem.type =='textarea'"
            type="textarea"
            v-model="form[subItem.prop]"
          ></el-input>
          <el-select
            :disabled="disabled"
            :placeholder="`请输入${item.label}`"
            v-else-if="subItem.type =='select'"
            v-model="form[subItem.prop]"
          >
            <el-option
              v-for="subItem in item.options||[]"
              :key="subItem.code"
              :label="subItem.content"
              :value="subItem.code"
            />
          </el-select>
          <el-date-picker
            :placeholder="`请选择${item.label}`"
            type="date"
            v-else-if="item.type =='date'"
            v-model="form[item.prop]"
            value-format="timestamp"
          />
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script>
let formList = [
  {
    title: "名片所属:",
    children: [
      { label: "客服名称:", prop: "name" },
      { label: "创建日期:", prop: "name" }
    ]
  },
  {
    title: "访客信息:",
    children: [
      { label: "访客来源:", type: "textarea", prop: "name" },
      { label: "对话页:", type: "textarea", prop: "name" },
      { label: "最初访问页:", type: "textarea", prop: "name" },
      { label: "关键词:", type: "textarea", prop: "name" }
    ]
  },
  {
    title: "名片信息:",
    children: [
      { label: "名片标签:", type: "text", prop: "name" },
      { label: "项目:", type: "text", prop: "name" },
      { label: "性别:", type: "text", prop: "name" },
      { label: "手机:", type: "text", prop: "name" },
      { label: "电话:", type: "text", prop: "name" },
      { label: "客户分类:", type: "text", prop: "name" },
      { label: "公司:", type: "text", prop: "name" },
      { label: "网址:", type: "text", prop: "name" },
      { label: "回电时间:", type: "text", prop: "name" },
      { label: "微信:", type: "text", prop: "name" },
      { label: "地区:", type: "text", prop: "name" },
      { label: "QQ:", type: "text", prop: "name" },
      { label: "邮箱:", type: "text", prop: "name" },
      { label: "备注:", type: "text", prop: "name" },
      { label: "推广渠道:", type: "text", prop: "name" },
      { label: "自定义字段:", type: "text", prop: "name" }
    ]
  }
];
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "",

  props: {
    height: String
  },

  data() {
    //这里存放数据
    return {
      form: {},
      formList: formList
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.detailde-warp {
  .el-form-item--mini.el-form-item {
    margin-bottom: 5px;
  }
}
</style>
