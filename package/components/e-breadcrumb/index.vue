/*
 * @Author: web.王晓冬
 * @Date: 2020-03-25 18:12:38
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-04 11:39:27
 * @Description: 面包屑组件 #显示当前页面的路径，快速返回之前的任意页面。
 * @axample=1 &title=基本用法 &info=默认获取router里mate对象里的title字段文本 
 //<e-breadcrumb></e-breadcrumb>  //end
 
 * @axample=2 &title=自定义用法 &info=自定义路由内容
 //<e-breadcrumb>
    <el-breadcrumb separator="》">
      <el-breadcrumb-item :to="{ path: '/' }">基础包</el-breadcrumb-item>
      <el-breadcrumb-item>面包屑组件</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button slot="extend" type="warning" icon="el-icon-plus">新增</el-button>
  </e-breadcrumb>
 //end
 */
<template>
  <div class="e-breadcrumb">
    <el-row style="min-height: 32px">
      <el-col :span="8" class="title e-flex-ver">
        <h5>
          <slot>{{ title }}</slot>
        </h5>
      </el-col>
      <el-col :span="16" class="ar">
        <slot name="extend"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "e-breadcrumb",
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      title: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $route: {
      handler(val) {
        if (!val.meta.title) {
          console.log("当前路由的meta里未定义title属性");
        } else {
          this.title = val.meta.title;
          document.title = val.meta.title;
        }
      },
      immediate: true,
    },
  },
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
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.e-breadcrumb {
  width: 100%;
  padding: 5px 5px 5px 0;
  box-sizing: border-box;
  background-color: rgb(247, 248, 249);
  border-bottom: 1px solid rgb(242, 242, 242);
  .title {
    height: 32px;
  }
  h5 {
    border-left: 2px solid #6a8597;
    line-height: 15px;
    height: 15px;
    padding-left: 5px;
    font-size: 13px;
    color: #333;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>