/*
 * @Author: web.王晓冬
 * @Date: 2020-05-21 15:23:42
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-03 15:54:47
 * @Description: 对话记录
 * @props: avatar{Boolean}         是否显示头像  默认:true
 * @props: bubble{Boolean}         是否显示气泡  默认:true
 * @props: senderRight{senderRight}发送者是否居右  默认:true



<template>
  <!-- <el-scrollbar style="height:100%"> -->
  <div class="eim-chat-main" v-loading="loading">
    <div v-if="!recordData.length" class="ac">
      <img src="http://test.jswebcall.com/record30/view/img/home_empty.4057a34b.png" alt />
    </div>

    <el-collapse v-if="dateGroup" v-model="activeName" accordion>
      <el-collapse-item title="2020-02-02" name="1">
        <div class="eim-chat-system-tips">
          <i class="el-icon-info"></i>建立对话
        </div>
        <chat-list :data="recordData" v-bind="$props"></chat-list>
      </el-collapse-item>
    </el-collapse>
    <chat-list v-if="!dateGroup && recordData.length" :data="recordData" v-bind="$props"></chat-list>
  </div>
  <!-- </el-scrollbar> -->
</template>

<script>
let data = [
  {
    type: 1,
    fileType: "jpg",
    name: "阿冬",
    message:
      "http://app.yzinter.com/d/file/news/automobile/2020-06-02/3c34fb9d8a80c12b7b33affb12481bf3.jpg",
    createTime: 1590473752000,
    avatarUrl:
      "http://test.easyliao.com/live/styles/images/201805/head-user.png"
  },
  {
    type: 2,
    fileType: "rar",
    name: "迷人的玉凤",
    message: "恩,你慢慢说",
    createTime: 1590181866000,
    avatarUrl:
      "//tva2.sinaimg.cn/crop.0.0.512.512.180/005LMAegjw8f2bp9qg4mrj30e80e8dg5.jpg"
  },
  {
    type: 1,
    fileType: "mp4",
    name: "阿冬",
    message: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
    createTime: 1590181866000,
    avatarUrl:
      "http://test.easyliao.com/live/styles/images/201805/head-user.png"
  },
  {
    type: 3,
    fileType: "text",
    name: "机器人",
    message: "问你一个问题",
    createTime: 1590181866000,
    avatarUrl:
      "http://test.easyliao.com/live/styles/images/201805/head-user.png"
  },

  {
    type: 1,
    fileType: "mp3",
    name: "迷人的玉凤",
    message:
      "https://img.tukuppt.com/newpreview_music/08/99/45/5c8971b5b0c2c1474.mp3",
    createTime: 1590181866000,
    avatarUrl:
      "//tva2.sinaimg.cn/crop.0.0.512.512.180/005LMAegjw8f2bp9qg4mrj30e80e8dg5.jpg"
  },
  {
    type: 1,
    name: "阿冬",
    createTime: 1590181866000,
    message: "怎么跳出 forEach啊？  有好的解决办法么？",
    avatarUrl:
      "http://test.easyliao.com/live/styles/images/201805/head-user.png"
  },
  {
    type: 2,
    name: "迷人的玉凤",
    message:
      "最好的方法就是不用forEach,最好的方法就是不用forEach,最好的方法就是不用forEach,重要是事说三遍",
    createTime: 1590181866000,
    avatarUrl:
      "//tva2.sinaimg.cn/crop.0.0.512.512.180/005LMAegjw8f2bp9qg4mrj30e80e8dg5.jpg"
  },
  {
    type: 1,
    name: "阿冬",
    message: "恩,没毛病 18210256005",
    createTime: 1590181866000,
    avatarUrl:
      "http://test.easyliao.com/live/styles/images/201805/head-user.png"
  }
];
data.map((v, i) => (v.id = i));
import chatList from "./chat-list";
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "e-chat-record",
  components: { chatList },
  props: {
    id: [String, Number],
    dateGroup: {
      type: Boolean,
      default: true
    },
    // 是否显示头像
    avatar: {
      type: Boolean,
      default: true
    },
    // 是否显示气泡
    bubble: {
      type: Boolean,
      default: true
    },
    // 发送者气泡位置
    senderRight: {
      type: Boolean,
      default: true
    }
  },

  data() {
    //这里存放数据
    return {
      activeName: "1",
      loading: false,
      recordData: data
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
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
el-main {
  padding: 10px;
}
.eim-chat-main {
  height: 100%;
  padding: 0px 10px 5px 0px;
  overflow-x: hidden;
  overflow-y: auto;
}
.eim-chat-system-tips {
  font-size: 12px;
  color: #666;
  background: #f7f7f7;
  height: 24px;
  line-height: 24px;
  border-radius: 10px;
  text-align: center;
  i {
    font-size: 14px;
    vertical-align: -1px;
    margin-right: 5px;
  }
}
</style>
