/*
 * @Author: web.王晓冬
 * @Date: 2020-03-19 10:29:17
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-02 11:30:24
 * @Description: file content
 */
<template>
  <el-container>
    <el-main>
      <e-breadcrumb />
      <e-search />
      <h1 class="ac mt50">fsfsdfsf</h1>
      <el-button @click="visible=true">新增</el-button>
      <!-- <e-table api="logList" /> -->
      <!-- el-form组件测试
      <detail :visible.sync="visible"></detail>-->

      <el-button v-auth="'crm'">我這裏測ui</el-button>
    </el-main>
    <e-side-bar
      id="10"
      :avatar="false"
      :visible.sync="visible"
      :show="show"
      width="460px"
      height="calc(100vh - 128px)"
    ></e-side-bar>
  </el-container>
</template>

<script>
let formItem = [
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
    span: 12,
    change: e => {
      console.log(11);
    }
  },
  { label: "日期2:", prop: "key1", type: "datetimerange", span: 12 },
  { label: "处理状态:", prop: "key1", type: "radio", options: [1, 2] },
  { label: "子站点:", prop: "key1", type: "checkbox", options: [1, 2] },
  { label: "日期:", prop: "key1", type: "datetime" },
  { label: "省市:", prop: "key1", type: "cascader" },
  { label: "省市:", prop: "key1", type: "switch" },
  { label: "省市:", prop: "key1", type: "colorPicker" },
  { label: "关键词:", prop: "key1", type: "textarea", span: 24 }
];
formItem = formItem.map((v, i) => {
  v.prop = `key${i}`;
  return v;
});
import detail from "./detail.vue";
export default {
  name: "msg",
  props: {
    msg: String
  },
  data() {
    return {
      show: [
        { label: "访客对话", props: { bubble: true, avatar: true } },
        "访客留言",
        "详细信息"
      ],
      visible: true,
      form: {
        key5: [1]
      },
      option: formItem
    };
  },
  components: { detail },
  computed: {},
  methods: {
    cancel() {},
    submit(form, done) {
      if (!form.key0) {
        return;
      }
      // 对form数据重新处理
      form.aaa = 1;
      done();
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  padding: 10px;
}
</style>
