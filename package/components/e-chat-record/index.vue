/*
 * @Author: web.王晓冬
 * @Date: 2020-05-21 15:23:42
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-05-26 14:32:48
 * @Description: 对话记录
 * @props: avatar{Boolean}         是否显示头像  默认:true
 * @props: bubble{Boolean}         是否显示气泡  默认:true
 * @props: senderRight{senderRight}发送者是否居右  默认:true



<template>
  <div class="eim-chat-main">
    <el-checkbox v-model="avatar">是否显示头像</el-checkbox>
    <el-checkbox v-model="bubble">是否显示气泡</el-checkbox>
    <el-checkbox v-model="senderRight">发送者居右</el-checkbox>
    <ul class="eim-chat-box" :class="{bubble:bubble}">
      <li
        v-for="item of recordData"
        :key="item.id"
        :class="{'eim-chat-mine':item.type==1, 'right':senderRight,'eim-chat-avatar':avatar}"
      >
        <div class="eim-chat-user">
          <img v-if="avatar" :src="item.avatarUrl" alt />
          <cite>
            <span class="eim-chat-name">{{item.name}}</span>
            <i>{{item.createTime | formatTime}}</i>
          </cite>
        </div>
        <div class="eim-chat-text">{{item.message}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
// 1访客 2me
let data = [
  {
    type: 1,
    name: "阿冬",
    message: "你好啊",
    createTime: 1590473752000,
    avatarUrl:
      "http://test.easyliao.com/live/styles/images/201805/head-user.png"
  },
  {
    type: 1,
    name: "阿冬",
    message: "你在干嘛",
    createTime: 1590181866000,
    avatarUrl:
      "http://test.easyliao.com/live/styles/images/201805/head-user.png"
  },
  {
    type: 1,
    name: "阿冬",
    message: "问你一个问题",
    createTime: 1590181866000,
    avatarUrl:
      "http://test.easyliao.com/live/styles/images/201805/head-user.png"
  },
  {
    type: 2,
    name: "迷人的玉凤",
    message: "恩,你慢慢说",
    createTime: 1590181866000,
    avatarUrl:
      "//tva2.sinaimg.cn/crop.0.0.512.512.180/005LMAegjw8f2bp9qg4mrj30e80e8dg5.jpg"
  },
  {
    type: 2,
    name: "迷人的玉凤",
    message: "别着急",
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
    message: "恩,没毛病",
    createTime: 1590181866000,
    avatarUrl:
      "http://test.easyliao.com/live/styles/images/201805/head-user.png"
  }
];
data.map((v, i) => (v.id = i));
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "",

  props: {
    // 是否显示头像
    avatar: {
      type: Boolean,
      default: true
    },
    // 是否显示气泡
    bubble: {
      type: Boolean,
      default: false
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
      form: {},
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
$e-im-primary: #409eff;
$e-im-info: #e2e2e2;
$e-im-other: #e6a23c;
.eim-chat-main {
  padding: 15px 15px 5px;
  overflow-x: hidden;
  overflow-y: auto;
  .eim-chat-box {
    //发送人
    li {
      position: relative;
      font-size: 0;
      margin-bottom: 10px;
      padding-left: 0px;
      min-height: 48px;

      .eim-chat-text,
      .eim-chat-user {
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
      }
      .eim-chat-user {
        position: absolute;
        left: 3px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
        cite {
          position: absolute;
          font-style: normal;
          left: 0px;
          top: -2px;
          width: 500px;
          line-height: 24px;
          font-size: 12px;
          white-space: nowrap;
          color: #67c23a;
          text-align: left;
          font-style: normal;
          i {
            padding-left: 15px;
            font-style: normal;
          }
        }
      }
      .eim-chat-text {
        position: relative;
        line-height: 22px;
        margin-top: 25px;
        padding: 0;
        margin-left: 0;
        text-align: left;
        border-radius: 3px;
        color: #333;
        word-break: break-all;
      }
      // 是否显示头像内容
      &.eim-chat-avatar {
        padding-left: 60px;
        .eim-chat-user {
          cite {
            left: 60px;
            color: #999;
          }
        }
      }
    }
    .eim-chat-mine {
      .eim-chat-user {
        cite {
          color: $e-im-primary;
        }
      }
    }
    // 默认发送者的在左侧.
    // 如果发送者位置在右侧
    @media screen and (max-width: 900px) {
      .eim-chat-mine.right {
        text-align: right;
        padding-left: 0;
        padding-right: 60px;
        .eim-chat-user {
          left: auto;
          right: 3px;
          cite {
            left: auto;
            right: 60px;
            text-align: right;
            span {
              float: right;
            }
            i {
              padding-left: 0;
              padding-right: 15px;
            }
          }
        }
        .eim-chat-text {
          &::after {
            left: auto;
            right: -10px;
            border-top-color: $e-im-primary;
          }
        }
      }
    }
  }
  //默认没有气泡.
  // 如果有气泡的样式
  .eim-chat-box.bubble {
    //发送人
    li {
      min-height: 68px;
      .eim-chat-user {
        cite {
          color: "#999";
        }
      }
    }

    .eim-chat-text {
      padding: 8px 15px;
      background-color: $e-im-info;
      &::after {
        content: "";
        position: absolute;
        left: -10px;
        top: 13px;
        width: 0;
        height: 0;
        border-style: solid dashed dashed;
        border-color: $e-im-info transparent transparent;
        overflow: hidden;
        border-width: 10px;
      }
    }
    .eim-chat-mine {
      .eim-chat-text {
        background-color: $e-im-primary;
        color: #fff;
        &::after {
          border-color: $e-im-primary transparent transparent;
        }
      }
    }
  }
}
</style>
