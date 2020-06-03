/*
 * @Author: web.王晓冬
 * @Date: 2020-05-21 16:47:38
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-03 17:18:19
 * @Description: 留言
*/


<template>
  <div class="detailde-warp">
    <e-form
      :span="24"
      api="apiService"
      refs="form"
      size="small"
      label-width="120px"
      v-model="form"
      :option="option"
    >
      <template v-slot:key5>
        根据key的值自定义元素
        <el-button>按钮</el-button>
      </template>
    </e-form>
  </div>
</template>

<script>
let formList = [
  {
    label: "所有者:",
    prop: "key1",
    type: "text",
    append: "132",
    rules: { required: true },
    change: val => {
      console.log(val);
    }
  },
  { label: "创建者:", prop: "key1", type: "select" },
  {
    label: "日期1:",
    prop: "key1",
    type: "daterange",
    change: e => {
      console.log(11);
    }
  },
  { label: "日期2:", prop: "key1", type: "datetimerange" },
  { label: "处理状态:", prop: "key1", type: "radio", options: [1, 2] },
  { label: "子站点:", prop: "key1", type: "checkbox", options: [1, 2] },
  { label: "日期:", prop: "key1", type: "datetime" },
  { label: "省市:", prop: "key1", type: "cascader" },
  { label: "省市:", prop: "key1", type: "switch" },
  { label: "省市:", prop: "key1", type: "colorPicker" },
  { label: "关键词:", prop: "key1", type: "textarea", span: 24 }
];
formList = formList.map((v, i) => {
  v.prop = `key${i}`;
  return v;
});
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
      option: formList
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
