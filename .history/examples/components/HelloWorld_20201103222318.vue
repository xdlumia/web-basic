/*
 * @Author: web.王晓冬
 * @Date: 2020-03-19 10:29:17
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-11-03 22:23:19
 * @Description: file content
 */
<template>
  <div>
    <!-- <el-button @click="visible=true">我這裏測ui</el-button> -->
    <el-container>
      <el-main>
        <d-v-player />
        <d-select-tree
          multiple
          defaultExpandAll
          v-model="form.a"
          :data="[
            {
              label: '一级 1',
              id: 1,
              children: [
                {
                  label: '二级 1-1',
                  id: 2,
                  children: [
                    {
                      id: 3,
                      children: null,
                      label: '三级 1-1-1',
                    },
                  ],
                },
              ],
            },
          ]"
        ></d-select-tree>
        <d-table
          ref="table"
          border
          api="mockGetUser"
          :params="{}"
          style="height: calc(100vh - 20px)"
        >
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column
            min-width="100px"
            v-for="item of colList"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
          ></el-table-column>
        </d-table>
        <!-- <e-breadcrumb />
      <e-search />
      <h1 class="ac mt50">fsfsdfsf</h1>
      <el-button @click="visible=true">新增</el-button>
        <e-table api="logList" />-->
        <!-- el-form组件测试 -->
        <!-- <detail :visible.sync="visible"></detail> -->
      </el-main>
      <d-side-bar
        mode="ver"
        id="10"
        :visible.sync="visible"
        :show="show"
        height="calc(100vh - 63px)"
      ></d-side-bar>
    </el-container>
  </div>
</template>

<script>
let formItem = [
  {
    label: "所有者:",
    prop: "key1",
    type: "text",
    append: "132",
    rules: { required: true },
    change: (val) => {
      console.log(val);
    },
  },
  {
    label: "创建者:",
    prop: "key1",
    type: "select",
    dic: [{ label: "测试", value: 1 }],
  },
  {
    label: "日期1:",
    prop: "key1",
    type: "daterange",
    span: 12,
    change: (e) => {
      console.log(11);
    },
  },
  { label: "日期2:", prop: "key1", type: "datetimerange", span: 12 },
  {
    label: "处理状态:",
    prop: "key1",
    type: "radio",
    dic: [{ label: "测试", value: 1 }],
  },
  {
    label: "子站点:",
    prop: "key1",
    type: "checkbox",
    dic: [{ label: "测试", value: 1 }],
  },
  { label: "日期:", prop: "key1", type: "datetime" },
  { label: "省市:", prop: "key1", type: "cascader" },
  { label: "省市:", prop: "key1", type: "switch" },
  { label: "省市:", prop: "key1", type: "colorPicker" },
  { label: "关键词:", prop: "key1", type: "textarea", span: 24 },
];
formItem = formItem.map((v, i) => {
  v.prop = `key${i}`;
  return v;
});
let col = [
  { label: "姓名", width: "80px", prop: "rank" },
  { label: "手机", prop: "groupName" },
  { label: "电话", prop: "customers" },
  { label: "所属者", width: "180px", prop: "handle" },
  { label: "创建者", width: "180px", prop: "handle" },
  { label: "创建时间", width: "180px", prop: "handle" },
  { label: "修改时间", width: "180px", prop: "handle" },
  { label: "名片分配时间", width: "180px", prop: "handle" },
  { label: "处理状态", width: "180px", prop: "handle" },
  { label: "客户来源", width: "180px", prop: "handle" },
  { label: "对话页", width: "180px", prop: "handle" },
  { label: "最初访问页", width: "180px", prop: "handle" },
  { label: "关键词", width: "180px", prop: "handle" },
  { label: "国家", width: "180px", prop: "handle" },
  { label: "省份", width: "180px", prop: "handle" },
  { label: "城市", width: "180px", prop: "handle" },
  { label: "子站点", width: "180px", prop: "handle" },
  { label: "设置类型", width: "180px", prop: "handle" },
];
col = col.map((v, i) => {
  v.prop = `key${i}`;
  return v;
});
import detail from "./detail.vue";
export default {
  name: "msg",
  props: {
    msg: String,
  },
  data() {
    return {
      colList: col,
      show: [
        { label: "访客对话", props: { bubble: true, avatar: true } },
        "访客留言",
        "详细信息",
      ],
      visible: true,
      form: {
        key5: [1],
        a: [1],
      },
      option: formItem,
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
    },
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  padding: 10px;
}
</style>
