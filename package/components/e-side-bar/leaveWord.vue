/*
 * @Author: web.王晓冬
 * @Date: 2020-05-21 16:47:38
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-05-21 16:47:49
 * @Description: 留言
*/


<template>
  <div class="detailde-warp">留言</div>
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
