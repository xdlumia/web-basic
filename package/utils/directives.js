/*
 * @Author: web.王晓冬
 * @Date: 2019-08-01 11:54:35
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-04-02 11:41:49
 * @Description: 自定义指令 directive
 * @axample: 
 //弹出框添加拖拽
 <el-dialog v-dialogDrag ></el-dialog>
 <el-button v-debounce >保存</el-button>
 */

export default {
  // dialog拖拽指令#
  dialogDrag: {
    bind: function bind(el, binding, vnode, oldVnode) {
      //弹框可拉伸最小宽高
      var minWidth = 400;
      var minHeight = 300;
      //初始非全屏
      var isFullScreen = false;
      //当前宽高
      var nowWidth = 0;
      var nowHight = 0;
      //当前顶部高度
      var nowMarginTop = 0;
      //获取弹框头部（这部分可双击全屏）
      var dialogHeaderEl = el.querySelector('.el-dialog__header');
      //弹窗
      var dragDom = el.querySelector('.el-dialog');
      //给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog；
      dragDom.style.overflow = "auto";
      //清除选择头部文字效果
      dialogHeaderEl.onselectstart = new Function("return false");
      //头部加上可拖动cursor
      dialogHeaderEl.style.cursor = 'move';

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      var sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

      var moveDown = function moveDown(e) {
        // 鼠标按下，计算当前元素距离可视区的距离
        var disX = e.clientX - dialogHeaderEl.offsetLeft;
        var disY = e.clientY - dialogHeaderEl.offsetTop;
        const dragDomWidth = dragDom.offsetWidth
        const dragDomHeight = dragDom.offsetHeight

        const screenWidth = document.body.clientWidth
        const screenHeight = document.body.clientHeight

        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

        // 获取到的值带px 正则匹配替换
        var styL = void 0,
          styT = void 0;

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes('%')) {
          styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
          styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
        } else {
          styL = +sty.left.replace(/\px/g, '');
          styT = +sty.top.replace(/\px/g, '');
        };

        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX
          let top = e.clientY - disY

          // 边界处理
          if (-(left) > minDragDomLeft) {
            left = -minDragDomLeft
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft
          }

          if (-(top) > minDragDomTop) {
            top = -minDragDomTop
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop
          }

          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

          // emit onDrag event
          vnode.child.$emit('dragDialog')
        };

        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
      dialogHeaderEl.onmousedown = moveDown;
      //双击头部效果
      dialogHeaderEl.ondblclick = function (e) {
        if (isFullScreen == false) {
          nowHight = dragDom.clientHeight;
          nowWidth = dragDom.clientWidth;
          nowMarginTop = dragDom.style.marginTop;
          dragDom.style.left = 0;
          dragDom.style.top = 0;
          dragDom.style.height = "100VH";
          dragDom.style.width = "100VW";
          dragDom.style.marginTop = 0;
          isFullScreen = true;
          dialogHeaderEl.style.cursor = 'initial';
          dialogHeaderEl.onmousedown = null;
        } else {
          dragDom.style.height = "auto";
          dragDom.style.width = nowWidth + 'px';
          dragDom.style.marginTop = nowMarginTop;
          isFullScreen = false;
          dialogHeaderEl.style.cursor = 'move';
          dialogHeaderEl.onmousedown = moveDown;
        }
      };

      //拉伸
      var resizeEl = document.createElement("div");
      dragDom.appendChild(resizeEl);
      //在弹窗右下角加上一个10-10px的控制块
      resizeEl.style.cursor = 'se-resize';
      resizeEl.style.position = 'absolute';
      resizeEl.style.height = '10px';
      resizeEl.style.width = '10px';
      resizeEl.style.right = '0px';
      resizeEl.style.bottom = '0px';
      //鼠标拉伸弹窗
      resizeEl.onmousedown = function (e) {

        // 记录初始x位置
        var clientX = e.clientX;
        // 鼠标按下，计算当前元素距离可视区的距离
        var disX = e.clientX - resizeEl.offsetLeft;
        var disY = e.clientY - resizeEl.offsetTop;

        document.onmousemove = function (e) {
          e.preventDefault(); // 移动时禁用默认事件

          // 通过事件委托，计算移动的距离 
          var x = e.clientX - disX + (e.clientX - clientX); //这里 由于elementUI的dialog控制居中的，所以水平拉伸效果是双倍
          var y = e.clientY - disY;
          //比较是否小于最小宽高
          dragDom.style.width = x > minWidth ? x + 'px' : minWidth + 'px';
          dragDom.style.height = y > minHeight ? y + 'px' : minHeight + 'px';
        };
        //拉伸结束
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  },//end
  // click 时间防抖 一般用于 表单提交 {Number=1000} 毫秒#
  debounce: {
    inserted(el, binding) {
      let duration = binding.value || 1000
      el.addEventListener('click', e => {
        if (!el.disabled) {
          el.disabled = true
          let timer = setTimeout(() => {
            el.disabled = false
            timer = null
          }, duration)
        }
      })
    }
  },//end

  // auth 权限码 {String} v-auth="'crm1'"#
  auth: {
    inserted(el, binding, vnode) {
      let authCodes = vnode.context.authCodes
      let code = binding.value
      if (authCodes.includes(code)) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  }
};