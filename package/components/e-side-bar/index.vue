/*
 * @Author: web.王晓冬
 * @Date: 2020-05-21 15:23:42
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-05 15:07:35
 * @Description: 侧边栏
 * @props: height{String}          高度
 * @props: show{Array}             显示的tab页签  默认:全部显示
 * @props: direction{String}       触发位置  默认:right 
*/

<template>
  <el-aside :width="sideWidth">
    <div class="side-bar-box" :class="`direction-${direction}`" :style="{height:height}">
      <side-main
        :height="height"
        :visible.sync="isVisible"
        :show="show"
        :direction="direction"
        :id="id"
        :fixed.sync="fixed"
      ></side-main>
    </div>
  </el-aside>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "e-side-bar",
  props: {
    // 显示
    visible: { type: Boolean, required: true, default: false },
    // 显示模式 hor 菜单水平展示 ver垂直
    mode: { type: String, default: "hor" },
    // id 所有数据交互根据这一个id查询
    id: { type: String, required: true },
    // 侧边栏宽度
    width: { type: String, default: "460px" },
    // 侧边栏高度
    height: { type: String, default: "100vh" },
    // 显示tab 默认显示tabs里的内容
    show: Array
  },
  components: {},
  data() {
    //这里存放数据
    return {
      fixed: false
    };
  },
  //监听属性 类似于data概念
  computed: {
    sideWidth() {
      // 如果侧边栏显示就按按自定义的最大宽度显示. 如果是hor 水平模式 最小宽度10px ver 模式最小宽度50px
      const W = {
        hor: "10px",
        ver: "50px"
      };
      return (this.mode == "ver" && this.fixed && this.isVisible) ||
        (this.mode == "hor" && this.isVisible)
        ? this.width
        : W[this.mode];
    },
    // 自动判断侧边栏居左还是居右
    direction() {
      return this.$parent.$children[0].$options._componentTag == "e-side-bar"
        ? "left"
        : "right";
    },
    isVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  //监控data中的数据变化
  watch: {
    // 初始化的时候根据mode 不同配置获取加载不同的组件
    mode: {
      handler(val) {
        const sideMain = require(`./side-${val}`).default;
        this.$options.components.sideMain = sideMain;
      },
      immediate: true
    }
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
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.el-aside {
  overflow: inherit;
  position: relative;
  transition: 0.2s;
}
.side-bar-box {
  width: 100%;
  margin-top: 10px;
  position: relative;
  // padding: 3px;
  // box-sizing: border-box;
  // border: 1px solid #efefef;
}
</style>
