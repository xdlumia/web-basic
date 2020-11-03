/*
 * @Author: web.王晓冬
 * @Date: 2020-11-03 16:29:47
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-11-04 00:05:07
 * @Description: file content
*/
/**
* @Author: web.王晓冬
* @Date: 2019-10-31 20:01:21
* @LastEditors: web.王晓冬
* @LastEditTime: 2020-03-24 14:01:13
* @Description: file content
* @author web-王晓冬
* @date 2018年9月10日
* @param api {String}                  ---api接口 微服务名称.url方法名称  必填
* @param params {Object}               ---接口参数;  默认{ page: 1, size: 15 }
* @param size {String}                 ---表格size 
* @param autoInit {String}                 ---表格size 
* @param page {Boole}                ---是否显示分页   默认true
* @param dragClass {string}             ---是否拖动 以及为列表中对象设置手柄，按住对象的拖动手柄才可以进行拖动  
* @param rowClassName {string function} ---定义拖动的class. 返回参数要和dragClass相同. 具体使用方式参考element ui
* @param slot                          ---slot
* @fucnton dragEnd  ---拖动结束的参数. 返回拖动修改后的数据
**/

<template>
  <div class="d-player-wrap">
    <video
      ref="dVideo"
      :controls="false"
      class="d-player-main"
      @loadstart="loadstart"
      @durationchange="durationchange"
      @loadeddata="loadeddata"
      @progress="progress"
      @canplay="canplay"
      @timeupdate="timeupdate"
      @ended="ended"
      width="100%"
      height="100%"
      poster="http://www.html5videoplayer.net/poster/madagascar3.jpg"
      src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
    ></video>
    <div class="d-player-control">
      <div class="d-control-progress">
        <div
          @mousedown="onButtonDown"
          @touchstart="onButtonDown"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @focus="handleMouseEnter"
          @blur="handleMouseLeave"
          class="d-progress-bar"
        >
          <div
            class="d-progress-play"
            :style="{ width: `${playRatio}%` }"
          ></div>
          <div
            class="d-progress-load"
            :style="{ width: `${loadRatio}%` }"
          ></div>
        </div>
      </div>
      <div class="d-control-tool">
        <div class="d-tool-left">
          <div>
            <d-icon
              @click="togglePlay"
              size="24"
              :icon="`icon-${isPaused ? 'play' : 'pause'}`"
            ></d-icon>
          </div>
          <div><d-icon size="20" icon="icon-next"></d-icon></div>
          <div class="d-tool-time">{{ currentTime }} / {{ totalTime }}</div>
        </div>
        <div class="d-tool-left">
          <div>倍速</div>
          <div>
            <d-icon
              size="20"
              @click="requestPictureInPicture"
              icon="icon-volume-down"
            ></d-icon>
          </div>
          <div><d-icon size="20" icon="icon-settings"></d-icon></div>
          <div><d-icon size="20" icon="icon-screen"></d-icon></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import dIcon from "./d-icon";

export default {
  name: "d-v-player",
  props: {
    //参数
    params: {
      type: [Object, String, Number],
      default: function () {
        return { page: 1, size: 15 };
      },
    },
  },
  data() {
    return {
      dVideo: null,
      //标记当前的播放状态
      isPaused: true,
      //标记当前是否静音
      isMuted: false,
      //当前播放时间
      currentTime: "00:00:00",
      // 当前进度比例
      playRatio: 0,
      loadRatio: 0,
      //总时长
      totalTime: "00:00:00",
      //标记控制面板是否可见
      isShow: true,
      //开始时间，毫秒为单位
      startTime: 0,
      hovering: false,
      dragging: false,
    };
  },
  created() {},
  mounted() {
    this.dVideo = this.$refs.dVideo;
  },
  methods: {
    togglePlay() {
      //视频标签（video）原生方法：
      //play():让视频播放
      //pause():让视频暂停
      if (this.isPaused) {
        this.dVideo.play();
      } else {
        this.dVideo.pause();
      }
      this.isPaused = !this.isPaused;
    },
    //开始加载
    loadstart(ev) {
      console.log("开始加载");
    },
    // 已获得播放时长
    durationchange(ev) {
      this.totalTime = this.timeFormat(ev.target.duration);
    },
    // 获得播放头文件
    loadeddata(ev) {
      console.log("已获取播放头");
    },
    // 缓冲下载中
    progress(ev) {
      console.log("开始缓冲");
      let duration = ev.target.duration; // 媒体总长
      let length = ev.target.buffered.length;
      let end = ev.target.buffered.end(length - 1);
      this.loadRatio = ((end / duration) * 100).toFixed(2);
      // console.dir(ev.target.buffered.length);
      // console.dir(ev.target.buffered.end(length - 1));
    },
    // 可以播放
    canplay(ev) {
      console.log("可以播放");
    },
    // 当前播放进度
    timeupdate(ev) {
      let duration = ev.target.duration; // 媒体总长
      let currentTime = ev.target.currentTime; // 当前歌曲播放长度
      this.playRatio = ((currentTime / duration) * 100).toFixed(2);
      this.currentTime = this.timeFormat(currentTime);
    },
    // 播放结束
    ended() {},
    //开启画中画模式
    requestPictureInPicture() {
      if (!document.pictureInPictureElement) {
        //开启
        this.dVideo.requestPictureInPicture().catch((error) => {
          console.log(error, "Video failed to enter Picture-in-Picture mode.");
        });
      } else {
        document.exitPictureInPicture().catch((error) => {
          console.log(error, "Video failed to leave Picture-in-Picture mode.");
        });
      }
    },
    onButtonDown(ev) {
      ev.preventDefault();
      console.log(ev);
      this.onDragStart(ev);
      // 鼠标移动
      window.addEventListener("mousemove", this.onDragging);
      window.addEventListener("touchmove", this.onDragging);
      // 鼠标释放
      window.addEventListener("mouseup", this.onDragEnd);
      window.addEventListener("touchend", this.onDragEnd);
      // 点击右键
      window.addEventListener("contextmenu", this.onDragEnd);
    },
    // 拖拽开始
    onDragStart(ev) {
      ev.preventDefault();
      this.dragging = true;
      // if (ev.type === "touchmove") {
      //   ev.clientY = ev.touches[0].clientY;
      //   ev.clientX = ev.touches[0].clientX;
      // }
      // // diff = ev.offsetX / ev.target.clientWidth;
      // if (ev.offsetX < 0 || ev.offsetX > this.dVideo.clientWidth) return;
      // let diff = ev.offsetX / this.dVideo.clientWidth;
      // // 播放进度条进度
      // this.playRatio = diff * 100;
      // this.currentTime = this.timeFormat(this.dVideo.duration * diff);
    },
    // 拖拽中
    onDragging(ev) {
      ev.preventDefault();
      if (!this.dragging) return;
      if (ev.type === "touchmove") {
        ev.clientY = ev.touches[0].clientY;
        ev.clientX = ev.touches[0].clientX;
      }
      // diff = ev.offsetX / ev.target.clientWidth;
      if (ev.offsetX < 0 || ev.offsetX > this.dVideo.clientWidth) return;
      let diff = (ev.offsetX / this.dVideo.clientWidth) * 100;
      // 播放进度条进度
      this.playRatio = diff * 100;
      this.currentTime = this.timeFormat(this.dVideo.duration * diff);
    },
    // 拖拽结束
    onDragEnd(event) {
      if (this.dragging) {
        /*
         * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
         * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
         */
        setTimeout(() => {
          this.dragging = false;
          // this.hideTooltip();
        }, 0);
        window.removeEventListener("mousemove", this.onDragging);
        window.removeEventListener("touchmove", this.onDragging);
        window.removeEventListener("mouseup", this.onDragEnd);
        window.removeEventListener("touchend", this.onDragEnd);
        window.removeEventListener("contextmenu", this.onDragEnd);
      }
    },
    handleMouseEnter(ev) {
      this.hovering = true;
      // this.displayTooltip();
    },

    handleMouseLeave(ev) {
      this.hovering = false;
      // this.hideTooltip();
    },

    // 播放速度
    playbackRates() {},
    toggleFullScreen(event) {
      const myvideo = this.$refs.myvideo;
      //如果当前是全屏状态，就退出全屏，否则进入全屏状态
      //获取当前的全屏状态
      let isFullscreen = document.webkitIsFullScreen || document.fullscreen;
      if (!isFullscreen) {
        const inFun =
          myvideo.requestFullscreen || myvideo.webkitRequestFullScreen;
        //让当前播放器进入全屏状态
        inFun.call(myvideo);
      } else {
        const exitFun =
          document.exitFullscreen || document.webkitExitFullScreen;
        //退出全屏状态要使用document
        exitFun.call(document);
      }
    },

    // 时间格式化
    timeFormat(time) {
      let hh = ~~(time / 3600);
      let mm = ~~((time % 3600) / 60);
      let ss = ~~(time % 60); //取整
      hh = hh < 10 ? "0" + hh : hh; //个位数补0
      mm = mm < 10 ? "0" + mm : mm; //个位数补0
      ss = ss < 10 ? "0" + ss : ss; //个位数补0
      return `${hh}:${mm}:${ss}`;
    },
  },
  beforeDestroy() {
    window.removeEventListener("reset", "this.resizeTable");
  },
  computed: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.d-player-wrap {
  position: relative;
  width: 800px;
  height: 450px;
  .d-player-main {
    position: absolute;
    z-index: 0;
    background-color: #000;
    top: 0;
    left: 0;
  }
}
.d-player-control {
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  height: 60px;
  width: 100%;
  color: #fff;

  .d-control-progress {
    width: 100%;
    position: relative;
    height: 14px;
    .d-progress-bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      width: 100%;
      transition: height 0.2s;
      background-color: rgba(255, 255, 255, 0.2);
      .d-progress-play,
      .d-progress-load {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .d-progress-play {
        z-index: 1;
        background-color: #1e95ff;
      }
      .d-progress-load {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    &:hover {
      .d-progress-bar {
        height: 14px;
      }
    }
  }
  .d-control-tool {
    position: absolute;
    padding: 0 20px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 46px;
    > div {
      display: flex;
      > div {
        margin-right: 15px;
      }
    }
    .d-tool-time {
      font-size: 12px;
      color: #fff;
    }
    .d-tool-left {
      align-items: center;
    }
  }
}
</style>