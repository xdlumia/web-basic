
/*
 * @Author: web.王晓冬
 * @Date: 2020-05-21 15:23:42
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-05 10:56:45
 * @Description: 侧边栏 菜单垂直模式
 * @props: height{String}          高度
 * @props: id{String,Number}          高度
 * @props: show{Array}             显示的tab页签  默认:全部显示
 * @props: direction{String}       触发位置  默认:right 
 * @props: fixed{Boolean}      是否固定  默认false
*/

<template>
  <div class="e-relative" style="height:100%; z-index:2000">
    <ul class="e-side-nav ac">
      <el-avatar
        :size="38"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      ></el-avatar>
      <p class="e-side-nav-name e-elip mb10">小礼堂小礼堂</p>
      <li
        @click="tabClick(item)"
        :class="{'nav-active':activeItem.label ==item.label}"
        class="e-side-nav-item"
        v-for="item of tabsFilter"
        :key="item.comp"
      >
        <el-tooltip class="item" effect="dark" :content="item.label" placement="left">
          <i class="iconfont f22" :class="item.icon"></i>
        </el-tooltip>
      </li>
    </ul>

    <!-- <keep-alive> -->
    <transition name="el-fade-in-linear">
      <div v-show="isVisible" class="side-main">
        <div class="side-main-header e-flex">
          <span class="el-icon-close f18" title="关闭" @click="isVisible=false,activeItem={}"></span>
          <span>{{activeItem.label}}</span>
          <span
            class="el-icon-fixed f18"
            title="固定"
            :class="{active:isFixed}"
            @click="isFixed = !isFixed"
          ></span>
        </div>
        <div
          class="e-auto-y"
          :id="id"
          v-bind="activeItem.props"
          style="height:calc(100% - 50px); padding:10px; box-sizing:border-box"
          :is="activeItem.comp"
        ></div>
      </div>
    </transition>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import detailed from "./detailed";
import leaveWord from "./leaveWord";
import record from "../e-chat-record";
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "side-ver",
  props: {
    // 显示
    fixed: { type: Boolean, required: true },
    visible: { type: Boolean, required: true },
    // id 所有数据交互根据这一个id查询
    id: { type: String, required: true },
    // 显示tab 默认显示tabs里的内容
    show: Array,
    // 侧边栏高度
    height: String,
    // 侧边位置
    direction: { type: String, default: "right" }
  },
  components: { detailed, leaveWord, record },
  data() {
    //这里存放数据
    return {
      activeItem: {},
      tabs: [
        { label: "访客对话", comp: "record", icon: "el-icon-s-order" },
        { label: "详细信息", comp: "detailed", icon: "el-icon-info" },
        { label: "访客留言", comp: "leaveWord", icon: "el-icon-s-comment" }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {
    isFixed: {
      get() {
        return this.fixed;
      },
      set(val) {
        this.$emit("update:fixed", val);
      }
    },
    isVisible: {
      get() {
        if (this.visible && !Object.keys(this.activeItem).length) {
          this.activeItem = this.tabsFilter[0];
        }
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    },
    tabsFilter() {
      return this.show
        ? this.show.map((item, i) => {
            item = typeof item == "string" ? { label: item } : item;
            let currObj = this.tabs.find(sub => sub.label == item.label);
            currObj = { ...currObj, ...item };
            return currObj;
          })
        : this.tabs;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tabClick(item) {
      if (item.label == this.activeItem.label) {
        this.activeItem = {};
        this.isVisible = false;
      } else {
        this.activeItem = item;
        this.isVisible = true;
      }
    }
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
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
$minWidth: 50px;
.e-side-nav {
  overflow: auto;
  position: absolute;
  z-index: 1;
  padding: 20px 0;
  box-sizing: border-box;
  right: 0px;
  top: 0;
  bottom: 0;
  width: $minWidth;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .e-side-nav-item {
    color: #666;
    line-height: 50px;
    &.nav-active {
      i {
        color: #1e95ff;
      }
    }
  }
  .e-side-nav-name {
    line-height: 20px;
    font-size: 12px;
  }
}
.side-main {
  background: #fff;
  position: absolute;
  right: 55px;
  top: 0;
  width: 400px;
  height: 100%;
  box-shadow: -5px 2px 10px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-left: 1px solid #dfe4ed;
  .side-main-header {
    span {
      transition: 0.2s;
      flex: 1;
      line-height: 40px;
      &:not(:nth-of-type(2)) {
        max-width: 40px;
      }
    }
    background-color: #1e95ff;
    color: #fff;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
}
.el-icon-close {
  &:hover {
    transform: rotate(180deg);
  }
}
.el-icon-fixed {
  background: url(../../images/icon/fixed.svg) no-repeat center;
  background-size: 20px;
  &:hover {
    animation: iconFixed 0.2s;
  }
  &.active {
    transform: rotate(45deg);
  }
}
@keyframes iconFixed {
  from {
    transform: rotate(-45deg);
  }
}
</style>
