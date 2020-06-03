/*
 * @Author: web.王晓冬
 * @Date: 2020-06-02 17:35:11
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-06-02 19:34:45
 * @Description: file content
*/

<template>
  <ul class="eim-chat-box" :class="{bubble:bubble}">
    <li
      v-for="item of data"
      :key="item.id"
      :class="{'eim-chat-mine':[1,3].includes(item.type), 'eim-chat-other':item.type==3, 'right':[1,3].includes(item.type)&&senderRight,'eim-avatar-show':avatar}"
    >
      <div class="eim-chat-user">
        <span v-if="avatar" :style="getAvatar(item.type)" class="eim-chat-avatar"></span>
        <cite>
          <span class="eim-chat-name">{{item.name}}</span>
          <i>{{item.createTime | formatTime}}</i>
        </cite>
      </div>
      <div class="eim-chat-text">
        <!-- 图片内容 -->
        <el-image
          class="eim-chat-img b-radius"
          v-if="isFileType(item,'img')"
          :preview-src-list="[item.message]"
          :src="item.message"
        ></el-image>
        <!-- 视频内容 -->
        <video
          width="100%"
          height="100%"
          controls
          class="eim-chat-video b-radius"
          :src="item.message"
          v-else-if="isFileType(item,'video')"
        >您的浏览器不支持 video 标签。</video>
        <!-- 音频内容 -->
        <audio
          class="eim-chat-audio"
          controls
          :src="item.message"
          v-else-if="isFileType(item,'audio')"
        >您的浏览器不支持 audio 标签。</audio>
        <!-- 附件内容 -->
        <div class="eim-chat-file b-radius" v-else-if="isFileType(item,'file')">
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

        <!-- 文本内容 -->
        <span class="eim-chat-txt" v-else v-html="formatPhone(item.message)"></span>
      </div>
    </li>
  </ul>
</template>

<script>
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
  name: "chat-list",
  props: {
    data: {
      type: Array,
      default: []
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
    return {};
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
    },
    formatPhone(text) {
      var getNum = text.replace(/[^0-9]/gi, "");
      if (getNum.length == 11) {
        //3.截取所有数字，并用*替换4，4
        var phnumAfter = getNum.substr(0, 3) + "****" + getNum.substr(7);
        return text.replace(getNum, phnumAfter);
      } else {
        return text;
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
$e-im-primary: #1e95ff;
$e-im-info: #eee;
$e-im-other: #ffefe4;
.b-radius {
  border-radius: 5px;
  border: 1px solid #d7d7d7;
}
.eim-chat-box {
  //发送人
  li {
    position: relative;
    font-size: 0;
    margin-bottom: 10px;
    padding-left: 0px;
    min-height: 48px;
    padding-right: 40px;

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
    padding-left: 40px;
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
      .eim-chat-txt {
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
    .eim-chat-user {
      cite {
        color: "#999";
      }
    }
  }

  .eim-chat-text {
    .eim-chat-txt {
      display: inline-block;
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
  }
  .eim-chat-mine {
    .eim-chat-text {
      .eim-chat-txt {
        background-color: $e-im-primary;
        color: #fff;
        &::after {
          border-color: $e-im-primary transparent transparent;
        }
      }
    }
    &.eim-chat-other {
      .eim-chat-text {
        .eim-chat-txt {
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

.eim-chat-img,
.eim-chat-video {
  width: 200px;
}
.eim-chat-img {
  height: 120px;
}
.eim-chat-file {
  width: 240px;
  box-sizing: border-box;
  background-color: #fff;

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
  width: 270px;
  &:focus {
    outline: 0px solid #efefef;
  }
}
</style>
