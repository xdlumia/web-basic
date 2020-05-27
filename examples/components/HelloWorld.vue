/*
 * @Author: web.王晓冬
 * @Date: 2020-03-19 10:29:17
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-05-27 14:28:57
 * @Description: file content
 */
<template>
  <div class="hello">
    <e-breadcrumb />
    <e-search />
    <el-button @click="visible=true">新增</el-button>
    <!-- <e-table api="logList" /> -->
    <el-dialog v-dialogDrag title="afsda" :visible="visible">
      <e-form size="small" label-width="120px" v-model="form" :option="option"></e-form>
    </el-dialog>
    <el-button v-auth="'crm'">我這裏測ui</el-button>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br />check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
  </div>
</template>

<script>
let formItem = [
  { label: "所有者:", prop: "key1", type: "text" },
  { label: "创建者:", prop: "key1", type: "select" },
  { label: "日期1:", prop: "key1", type: "daterange", span: 12 },
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

export default {
  name: "msg",
  props: {
    msg: String
  },
  data() {
    return {
      visible: true,
      form: {
        key5: [1]
      },
      option: formItem
    };
  },
  created() {
    // axios.get(
    //   "http://git.kinfe.net/api/v4/projects/21/repository/commits?per_page=100&page=1&private_token=Wz6K47F6HKPp1RUYTKxd&ref=dev",
    //   { wang: 123 }
    // );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  padding: 10px;
}
</style>
