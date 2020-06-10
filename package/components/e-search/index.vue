/*
 * @Author: web.王晓冬
 * @Date: 2020-03-25 19:29:49
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-03-26 14:37:10
 * @Description: e-search 搜索框底部
 */
<template>
  <div class="e-search">
    <el-row>
      <slot>我是自定义内容</slot>
    </el-row>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "e-search",
  props: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {}
};
</script>
<style lang='scss' scoped>
.e-search {
  border-left: 2px solid rgba(106, 133, 151, 1);
  width: 100%;
  box-sizing: border-box;
  padding: 15px 5px;
  background-color: rgba(235, 237, 241, 1);
  .title {
    height: 32px;
    display: flex;
    align-items: center;
  }
  h5 {
    border-left: 2px solid rgba(106, 133, 151, 1);
    line-height: 15px;
    height: 15px;
    padding-left: 10px;
    font-size: 13px;
    color: #333;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>