/*
 * @Author: web.王晓冬
 * @Date: 2020-03-19 10:29:17
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-04-14 14:49:01
 * @Description: file content
 */
<template>
  <div class="hello">
    <e-breadcrumb />
    <e-search />
    <!-- <e-table api="logList" /> -->
    <el-dialog v-dialogDrag title="afsda" :visible="visible"></el-dialog>
    <h1>{{ options | timeToStr }}</h1>
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
import axios from "axios";
// console.log(Base64);

export default {
  name: "msg",
  props: {
    msg: String
  },
  data() {
    return {
      visible: false,
      options: 1584945328
    };
  },
  created() {
    // axios.get(
    //   "http://git.kinfe.net/api/v4/projects/21/repository/commits?per_page=100&page=1&private_token=Wz6K47F6HKPp1RUYTKxd&ref=dev",
    //   { wang: 123 }
    // );
    this.$api.commit();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  padding: 10px;
}
</style>
