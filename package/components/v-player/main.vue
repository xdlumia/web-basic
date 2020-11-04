/*
 * @Author: web.王晓冬
 * @Date: 2020-11-03 16:29:47
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-11-04 19:20:01
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
  <div
    class="d-player-wrap"
    ref="playerWrap"
    :class="{ 'web-full-screen': isWebFullScreen }"
  >
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
      <div
        class="d-control-progress"
        @mousedown="onProgressDown"
        @touchstart="onProgressDown"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @focus="handleMouseEnter"
        @blur="handleMouseLeave"
      >
        <div class="d-progress-bar">
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
      <div class="d-control-tool" ref="controlWrap">
        <div class="d-tool-bar">
          <div class="d-tool-item">
            <d-icon
              @click="togglePlay"
              size="24"
              :icon="`icon-${isPaused ? 'play' : 'pause'}`"
            ></d-icon>
          </div>
          <!-- 下一部 -->
          <div class="d-tool-item">
            <d-icon size="18" icon="icon-next"></d-icon>
          </div>

          <div class="d-tool-item d-tool-time">
            <span>{{ currentTime }}</span> /
            <span class="total-time">{{ totalTime }}</span>
          </div>
        </div>
        <div class="d-tool-bar">
          <div class="d-tool-item">
            {{ speedActive == "1.0" ? "倍速" : speedActive + "X" }}
            <div class="d-tool-item-main">
              <ul class="speed-main">
                <li
                  :class="{ 'speed-active': speedActive == row }"
                  @click="playbackRate(row)"
                  v-for="row of options.speedRate"
                  :key="row"
                >
                  {{ row }}X
                </li>
              </ul>
            </div>
          </div>
          <!-- 音量 -->
          <div class="d-tool-item">
            <div class="d-tool-item-main volume-box">
              <div class="volume-main">
                <span class="volume-text-size">{{ ~~volumeSize }}%</span>
                <div
                  ref="volumeWrap"
                  class="volume-line"
                  @mousedown="onVolumeDown"
                  @touchstart="onVolumeDown"
                >
                  <p
                    class="volume-line-range"
                    :style="{ height: `${volumeSize}%` }"
                  ></p>
                </div>
              </div>
            </div>
            <d-icon
              @click="mutedHandler"
              size="18"
              :icon="`icon-volume-${
                volumeSize == 0 ? 'mute' : volumeSize > 50 ? 'up' : 'down'
              }`"
            ></d-icon>
          </div>
          <!-- 设置 -->
          <div class="d-tool-item">
            <d-icon size="20" icon="icon-settings"></d-icon>
            <div class="d-tool-item-main">设置</div>
          </div>
          <!-- 画中画 -->
          <div class="d-tool-item" @click="requestPictureInPicture">
            <d-icon size="20" icon="icon-pip"></d-icon>
            <div class="d-tool-item-main">画中画</div>
          </div>
          <!-- 画中画 -->
          <div class="d-tool-item" @click="isWebFullScreen = !isWebFullScreen">
            <d-icon size="20" icon="icon-web-screen"></d-icon>
            <div class="d-tool-item-main">网页全屏</div>
          </div>
          <!-- 全屏 -->
          <div class="d-tool-item" @click="toggleFullScreen">
            <div class="d-tool-item-main">全屏</div>
            <d-icon size="20" icon="icon-screen"></d-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// hex转rgb
function hexToRgba(hex) {
  return `${parseInt("0x" + hex.slice(1, 3))},${parseInt(
    "0x" + hex.slice(3, 5)
  )},${parseInt("0x" + hex.slice(5, 7))}`;
}
// import dIcon from "./d-icon";
export default {
  name: "d-v-player",
  props: {
    options: {
      type: Object,
      default: () => ({
        color: "#409eff",
        muted: false,
        webFullScreen: false,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
      }),
    },
  },
  data() {
    return {
      dVideo: null,
      //标记当前的播放状态
      isPaused: true,
      //标记当前是否静音
      isMuted: this.options.muted,
      isWebFullScreen: this.options.webFullScreen,
      //当前播放时间
      currentTime: "00:00:00",
      // 当前播放进度比例
      playRatio: 0,
      // 当前缓冲进度
      loadRatio: 0,
      //总时长
      totalTime: "00:00:00",
      //标记控制面板是否可见
      isShow: true,
      //开始时间，毫秒为单位
      startTime: 0,
      hovering: false,
      // 是否在拖拽中
      draging: false,
      volumeSize: 30,
      cacheVolumeSize: 0, //记录静音之前的大小
      startY: 0,
      speedActive: "1.0",
    };
  },
  created() {},
  mounted() {
    this.dVideo = this.$refs.dVideo;
    // 设置主题色
    this.$refs.playerWrap.style.setProperty(
      "--primary-color",
      hexToRgba(this.options.color)
    );
    // 循环添加工具栏鼠标滑过效果
    document.querySelectorAll(".d-tool-item").forEach((item) => {
      item.addEventListener("mouseenter", this.toolItemMouseenter);
      item.addEventListener("mouseleave", this.toolItemMouseleave);
    });
    // this.$refs.controlWrap.addEventListener("mouseenter", this.mouseenter);
  },
  methods: {
    // 控制栏鼠标hover
    toolItemMouseenter(ev) {
      if (ev.target.querySelector(".d-tool-item-main")) {
        ev.target.querySelector(".d-tool-item-main").style.display = "flex";
      }
    },
    toolItemMouseleave(ev) {
      if (ev.target.querySelector(".d-tool-item-main")) {
        ev.target.querySelector(".d-tool-item-main").style.display = "none";
      }
    },
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
      // 如果静音
      if (this.options.muted) {
        this.dVideo.muted = true;
      } else {
        this.dVideo.volume = this.volumeSize / 100;
      }
    },
    // 当前播放进度
    timeupdate(ev) {
      let duration = ev.target.duration; // 媒体总长
      let currentTime = ev.target.currentTime; // 当前歌曲播放长度
      this.playRatio = ((currentTime / duration) * 100).toFixed(2);
      this.currentTime = this.timeFormat(currentTime);
    },
    mutedHandler() {
      this.isMuted = !this.isMuted;
      this.dVideo.muted = this.isMuted;
      if (this.isMuted) {
        // 缓存静音之前的音量大小
        this.cacheVolumeSize = this.volumeSize;
        this.volumeSize = 0;
      } else {
        this.volumeSize = this.cacheVolumeSize;
      }
    },
    // 播放结束
    ended() {},
    // 音量按下
    onVolumeDown(ev) {
      ev.preventDefault();
      this.onVolumeStart(ev, "y");
      // 鼠标移动
      window.addEventListener("mousemove", this.onVolumeing);
      window.addEventListener("touchmove", this.onVolumeing);
      // 鼠标释放
      window.addEventListener("mouseup", this.onVolumeEnd);
      window.addEventListener("touchend", this.onVolumeEnd);
      // 点击右键
      window.addEventListener("contextmenu", this.onVolumeEnd);
    },
    // 音量鼠标按下触发
    onVolumeStart(ev, type) {
      this.draging = true;
      if (type == "y") {
        this.startY = ev.clientY - ev.offsetY;
      }
      // 音量大小
      let volume = this.onDraggFn(ev, this.$refs.volumeWrap, "y");
      this.volumeSize = volume * 100;
      this.dVideo.volume = volume;
    },
    onVolumeing(ev) {
      if (!this.draging) return;
      // 音量大小
      let volume = this.onDraggFn(ev, this.$refs.volumeWrap, "y");
      this.volumeSize = volume * 100;
      this.dVideo.volume = volume;
    },
    onVolumeEnd(ev) {
      if (this.draging) {
        /*
         * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
         * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
         */
        setTimeout(() => {
          this.draging = false;
        }, 0);
        window.removeEventListener("mousemove", this.onVolumeing);
        window.removeEventListener("touchmove", this.onVolumeing);
        window.removeEventListener("mouseup", this.onVolumeEnd);
        window.removeEventListener("touchend", this.onVolumeEnd);
        window.removeEventListener("contextmenu", this.onVolumeEnd);
      }
    },
    // 进度条按下
    onProgressDown(ev) {
      ev.preventDefault();
      this.onProgressStart(ev);
      // 鼠标移动
      window.addEventListener("mousemove", this.onDraging);
      window.addEventListener("touchmove", this.onDraging);
      // 鼠标释放
      window.addEventListener("mouseup", this.onDragEnd);
      window.addEventListener("touchend", this.onDragEnd);
      // 点击右键
      window.addEventListener("contextmenu", this.onDragEnd);
    },
    // 进度条鼠标按下触发
    onProgressStart(ev, type) {
      ev.preventDefault();
      this.draging = true;
      // 播放进度条进度
      this.playRatio = this.onDraggFn(ev, this.$refs.playerWrap) * 100;
      this.currentTime = this.timeFormat(
        ev.target.duration * this.onDraggFn(ev, this.$refs.playerWrap)
      );
    },
    // 拖拽中
    onDraging(ev) {
      ev.preventDefault();
      if (!this.draging) return;
      // 播放进度条进度
      this.playRatio = this.onDraggFn(ev, this.$refs.playerWrap) * 100;

      this.currentTime = this.timeFormat(
        this.dVideo.duration * this.onDraggFn(ev, this.$refs.playerWrap)
      );
    },
    // 获取鼠标拖拽比例
    onDraggFn(ev, evBox, type) {
      if (ev.type === "touchmove" || ev.type === "touchstart") {
        ev.clientY = ev.touches[0].clientY;
        ev.clientX = ev.touches[0].clientX;
      }
      // 如果是Y轴拖动
      if (type == "y") {
        // console.log(this.startY);
        let evBoxClientHeight = evBox.clientHeight;
        // 获取整个播放器宽度
        // let offsetTop = evBox.offsetTop - ev.offsetX;
        // console.log(ev.offsetX / evBoxClientHeight);
        let value =
          (evBoxClientHeight - (ev.clientY - this.startY)) / evBoxClientHeight;
        return value < 0 ? 0 : value > 1 ? 1 : value;
        // 鼠标移出播放器做的兼容

        return offsetTop / evBoxClientHeight;
      }
      // X轴拖动
      else {
        let evBoxClientWidth = evBox.clientWidth;
        // 获取整个播放器宽度
        let offsetX = ev.clientX - this.$refs.playerWrap.offsetLeft;
        let value = offsetX / evBoxClientWidth;
        // 鼠标移出播放器做的兼容
        return value < 0 ? 0 : value > 1 ? 1 : value;
      }
    },
    // 拖拽结束
    onDragEnd(ev) {
      if (this.draging) {
        /*
         * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
         * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
         */
        setTimeout(() => {
          this.draging = false;
          let diff = ev.offsetX / this.dVideo.clientWidth;
          // 播放进度条进度
          this.dVideo.currentTime = this.dVideo.duration * diff;
          // this.hideTooltip();
        }, 0);
        window.removeEventListener("mousemove", this.onDraging);
        window.removeEventListener("touchmove", this.onDraging);
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
    playbackRate(row) {
      this.speedActive = row;
      this.dVideo.playbackRate = row;
    },
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
    webFullScreen() {},
    // 全屏
    toggleFullScreen(event) {
      let playerWrap = this.$refs.playerWrap;
      //如果当前是全屏状态，就退出全屏，否则进入全屏状态
      //获取当前的全屏状态
      let isFullscreen = document.webkitIsFullScreen || document.fullscreen;
      if (!isFullscreen) {
        const inFun =
          playerWrap.requestFullscreen || myvideo.webkitRequestFullScreen;
        //让当前播放器进入全屏状态
        inFun.call(playerWrap);
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
  --primary-color: "";
  position: relative;
  width: 800px;
  height: 450px;
  transition: 0.2s;
  overflow: hidden;
  &.web-full-screen {
    z-index: 9999999;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }
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
  height: 50px;
  width: 100%;
  color: #fff;

  .d-control-progress {
    width: 100%;
    position: relative;
    height: 10px;
    .d-progress-bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      width: 100%;
      pointer-events: none;
      transition: height 0.2s;
      background-color: rgba(255, 255, 255, 0.2);
      .d-progress-play,
      .d-progress-load {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
      }
      .d-progress-play {
        z-index: 1;
        background-color: rgba(var(--primary-color), 1);
        &::before {
          content: "";
          position: absolute;
          right: -6px;
          top: 50%;
          width: 12px;
          height: 12px;
          transform: translateY(-50%);
          border-radius: 50%;
          background: rgba(var(--primary-color), 1);
          box-shadow: 0 0 0 5px rgba(var(--primary-color), 0.5);
        }
      }
      .d-progress-load {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    &:hover {
      .d-progress-bar {
        height: 100%;
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
    height: 40px;
    .d-tool-bar {
      display: flex;
      height: 100%;
      .d-tool-item {
        position: relative;
        height: 100%;
        cursor: pointer;
        text-align: center;
        margin: 0 8px;
        display: flex;
        align-items: center;
        font-size: 12px;
        .d-tool-item-main {
          position: absolute;
          white-space: nowrap;
          bottom: 100%;
          left: 50%;
          padding: 8px;
          box-sizing: border-box;
          display: none;
          background: rgba(0, 0, 0, 0.9);
          border-radius: 5px;
          transform: translateX(-50%);
        }
      }
    }
    // 时间
    .d-tool-time {
      font-size: 12px;
      color: #fff;
      font-weight: 300;
      .total-time {
        color: rgba(255, 255, 255, 0.8);
      }
    }
    // 音量
    .volume-box {
      height: 160px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      .volume-main {
        height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .volume-text-size {
          margin-bottom: 5px;
          font-size: 12px;
          font-weight: 400;
        }
      }
      .volume-line {
        position: relative;
        width: 3px;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 2px;
        cursor: pointer;
        .volume-line-range {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 20px;
          width: 100%;
          background-color: rgba(var(--primary-color), 1);
          pointer-events: none;
          &::before {
            content: "";
            position: absolute;
            left: 50%;
            top: -4px;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
    .speed-main {
      padding: 0 20px;
      li {
        cursor: pointer;
        line-height: 40px;
        font-size: 12px;
        color: #fff;
        &.speed-active {
          color: rgba(var(--primary-color), 1);
        }
      }
    }
  }
}
</style>