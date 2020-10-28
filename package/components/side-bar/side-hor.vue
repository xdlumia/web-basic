
/*
 * @Author: web.王晓冬
 * @Date: 2020-05-21 15:23:42
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-28 15:49:16
 * @Description: 侧边栏 菜单水平模式
 * @props: height{String}          高度
 * @props: id{String,Number}          高度
 * @props: show{Array}             显示的tab页签  默认:全部显示
 * @props: direction{String}       触发位置  默认:right 
*/

<template>
  <transition name="el-fade-in-linear">
    <div class="e-relative" style="height: 100%">
      <el-tabs
        v-model="activeName"
        type="border-card"
        v-show="isShow"
        @tab-click="tabClick"
      >
        <el-tab-pane
          v-for="item of tabsFilter"
          :key="item.comp"
          :label="item.label"
          :name="item.comp"
        ></el-tab-pane>
        <!-- <keep-alive> -->
        <div
          class="e-auto-y"
          :id="id"
          v-bind="activeProps"
          :style="{ height: tabHeight }"
          :is="activeName"
        ></div>

        <!-- </keep-alive> -->
      </el-tabs>
      <div
        class="nav-fixed"
        :class="{ active: !isShow }"
        @click="isShow = !isShow"
      ></div>
    </div>
  </transition>
</template>

<script>
import record from "../chat-record";
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "side-hor",
  props: {
    // 显示
    visible: { type: Boolean, required: true },
    // id 所有数据交互根据这一个id查询
    id: { type: String, required: true },
    // 显示tab 默认显示tabs里的内容
    show: Array,
    // 侧边栏高度
    height: String,
    // 侧边位置
    direction: { type: String, default: "right" },
  },
  components: { record },
  data() {
    //这里存放数据
    return {
      activeName: "record",
      activeProps: {},
      tabs: [{ label: "访客对话", comp: "record" }],
    };
  },
  //监听属性 类似于data概念
  computed: {
    isShow: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    tabHeight() {
      return `calc(${this.height} - 72px)`;
    },
    tabsFilter() {
      return this.show
        ? this.show.map((item, i) => {
            item = typeof item == "string" ? { label: item } : item;
            let currObj = this.tabs.find((sub) => sub.label == item.label);
            currObj = { ...currObj, ...item };
            if (i == 0) {
              this.activeName = currObj.comp;
              this.activeProps = currObj.props;
            }
            return currObj;
          })
        : this.tabs;
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tabClick() {
      let currObj = this.tabsFilter.find((v) => v.comp == this.activeName);
      this.activeProps = currObj.props || {};
    },
  },
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
.nav-fixed {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  transition: 0.2s;
  color: #272a2c;
  height: 55px;
  color: #666;
  line-height: 55px;
  width: 0px;
  border: 10px solid transparent;
  border-left-color: #ccd2d8;
  transform: scale(1);
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: rgb(170, 170, 170);
  }

  &::before {
    position: absolute;
    left: -10px;
    top: 23px;
    content: "";
    display: block;
    width: 5px;
    height: 5px;
    border: 2px solid #999;
    border-left: transparent;
    border-top: transparent;
    transform: rotate(-45deg);
  }
  &.active {
    transform: rotateY(180deg);
    left: -10px;
  }
}
.nav-fixed.left {
  border-right-color: #ccd2d8;
}
.direction-left {
  .nav-fixed {
    left: auto;
    right: 0;
    border: 10px solid transparent;
    border-right-color: #ccd2d8;
    &::before {
      left: auto;
      right: -10px;
      transform: rotate(135deg);
    }
    &.active {
      left: 0px;
      right: auto;
    }
  }
}
</style>
