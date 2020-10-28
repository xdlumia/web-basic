/*
 * @Author: web.王晓冬
 * @Date: 2020-03-19 10:29:17
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-07-16 17:31:53
 * @Description: file content
 */
<template>
  <div id="app">
    <HelloWorld msg="1584945328" />
  </div>
</template>
 
<script>
import HelloWorld from "./components/HelloWorld.vue";
import vue from "vue";
export default {
  name: "App",
  components: {
    HelloWorld
  },
  created() {}
};
</script>

<style>
</style>
