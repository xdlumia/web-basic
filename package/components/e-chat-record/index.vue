/*
 * @Author: web.王晓冬
 * @Date: 2020-05-21 15:23:42
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-02 16:55:13
 * @Description: 对话记录
 * @props: avatar{Boolean}         是否显示头像  默认:true
 * @props: bubble{Boolean}         是否显示气泡  默认:true
 * @props: senderRight{senderRight}发送者是否居右  默认:true



<template>
  <div class="eim-chat-main" v-loading="loading">
    <el-checkbox v-model="avatar">是否显示头像</el-checkbox>
    <el-checkbox v-model="bubble">是否显示气泡</el-checkbox>
    <el-checkbox v-model="senderRight">发送者居右</el-checkbox>
    <div v-if="!recordData.length" class="ac">
      <img src="http://test.jswebcall.com/record30/view/img/home_empty.4057a34b.png" alt />
    </div>
    <ul v-else class="eim-chat-box" :class="{bubble:bubble}">
      <li
        v-for="item of recordData"
        :key="item.id"
        :class="{'eim-chat-mine':[1,3].includes(item.type), 'eim-chat-other':item.type==3, 'right':senderRight,'eim-avatar-show':avatar}"
      >
        <div class="eim-chat-user">
          <span v-if="avatar" :style="getAvatar(item.type)" class="eim-chat-avatar"></span>
          <cite>
            <span class="eim-chat-name">{{item.name}}</span>
            <i>{{item.createTime | formatTime}}</i>
          </cite>
        </div>
        <div class="eim-chat-text">
          <!-- 图片类型 -->
          <el-image
            class="eim-chat-img"
            v-if="isFileType(item,'img')"
            :preview-src-list="[item.message]"
            :src="item.message"
          ></el-image>
          <!-- 视频类型 -->
          <video
            controls
            class="eim-chat-img"
            :src="item.message"
            v-else-if="isFileType(item,'video')"
          >您的浏览器不支持 video 标签。</video>
          <audio
            class="eim-chat-audio"
            controls
            :src="item.message"
            v-else-if="isFileType(item,'audio')"
          >您的浏览器不支持 audio 标签。</audio>
          <div class="eim-chat-file" v-else-if="isFileType(item,'file')">
            <div class="e-flex pb10">
              <i class="eim-chat-file-icon" :style="getFileType(item.fileType)"></i>
              <div class="f12 ml5" style="line-height:18px">
                <p class="e-elip" style="width:150px;">这是一个附件这是一个附件这是一个附件这是一个附件这是一个附件</p>
                <p class="e-text-gray">15.5kb</p>
              </div>
            </div>
            <div class="eim-chat-file-opera ac e-flex-hor">
              <a
                download="年终文件下载"
                target="_blank"
                href="https://space.dingtalk.com/auth/download?spaceId=225207592&path=10949375820"
              >
                <i class="el-icon-download"></i> 下载
              </a>
            </div>
          </div>
          <span class="eim-chat-txt" v-else v-html="item.message"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
let data = [
  {
    type: 1,
    fileType: "jpg",
    name: "阿冬",
    message:
      "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
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
    message: "恩,没毛病",
    createTime: 1590181866000,
    avatarUrl:
      "http://test.easyliao.com/live/styles/images/201805/head-user.png"
  }
];
data.map((v, i) => (v.id = i));
// 1me 2访客 3机器人 4监控者
const AVATAR_TYPE = {
  0: "0 -64px",
  1: "0 -224px",
  2: "0 -64px",
  3: "-32px -128px",
  4: "0 0"
};

const FILE_TYPE = {
  doc: "30px, -108px",
  docs: "30px, -108px",
  zip: "30px 0",
  ppt: "0 -108px",
  txt: "0 -144px",
  xls: "0 0",
  xlsx: "0 0",
  pdf: "0 -72px",
  html: "30px -144px"
};
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "e-chat-record",

  props: {
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
      form: {},
      loading: false,
      recordData: data
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 头像使用精灵图 获取头像坐标
    getAvatar(type) {
      return `background-position: ${AVATAR_TYPE[type]};`;
    },
    // 附件使用精灵图 获取附件坐标
    getFileType(type) {
      return `background-position: ${FILE_TYPE[type]};`;
    },
    // 判断文件类型
    isFileType(item, fileType) {
      let types = {
        img: "bmp/gif/jpeg/png/screenShots/mpeg/jpg",
        file: "txt/pdf/doc/docx/xls/xlsx/ppt/pptx/zip/rar/html",
        video: "mp4/ogg/webm",
        audio: "m4a/aac/mp3/wav"
      };
      return types[fileType].indexOf((item.fileType || "null").toLowerCase()) !=
        -1
        ? true
        : false;
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
$e-im-primary: #1e95ff;
$e-im-info: #eee;
$e-im-other: #ffefe4;

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
        .eim-chat-avatar {
          display: inline-block;
          background: url(./images/avatar.png) no-repeat;
          background-position: 0 -224px;
          width: 32px;
          height: 32px;
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
        .eim-chat-txt {
          line-height: 22px;
        }
        position: relative;
        margin-top: 25px;
        padding: 0;
        margin-left: 0;
        text-align: left;
        border-radius: 3px;
        color: #333;
        word-break: break-all;
      }
      // 是否显示头像内容
      &.eim-avatar-show {
        padding-left: 45px;
        .eim-chat-user {
          cite {
            left: 45px;
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
    .eim-chat-mine.right {
      text-align: right;
      padding-left: 0;
      padding-right: 0px;
      .eim-chat-user {
        left: auto;
        right: 3px;
        cite {
          left: auto;
          right: 0px;
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
      // 是否显示头像内容
      &.eim-avatar-show {
        padding-right: 45px;
        .eim-chat-user {
          cite {
            right: 45px;
            color: #999;
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
      padding: 8px 10px;
      background-color: $e-im-info;
      &::after {
        content: "";
        position: absolute;
        left: -10px;
        top: 6px;
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
      &.eim-chat-other {
        .eim-chat-text {
          background-color: $e-im-other;
          color: #434d6a;
          &::after {
            border-color: $e-im-other transparent transparent;
          }
        }
      }
    }
  }
}

.eim-chat-img {
  width: 200px;
  height: 120px;
}
.eim-chat-file {
  width: 240px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid $e-im-info;
  border-radius: 5px;
  padding: 8px;

  .eim-chat-file-icon {
    max-width: 32px;
    display: block;
    &::after {
      content: "";
      display: block;
      width: 30px;
      height: 36px;
      background: url(./images/fileFormat.png) no-repeat;
    }
  }

  // 附件工具栏
  .eim-chat-file-opera {
    a {
      &:hover {
        color: $e-im-primary;
      }
    }
    padding-top: 8px;
    font-size: 12px;
    text-align: center;
    border-top: 1px solid $e-im-info;
  }
}
.eim-chat-audio {
  &:focus {
    outline: 0px solid #efefef;
  }
}
</style>
