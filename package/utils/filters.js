/*
 * @Author: web.王晓冬
 * @Date: 2019-08-01 11:54:35
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-28 14:22:31
 * @Description: 自定义过滤器 filter
 * @axample: 
 //时间戳日期转字符串
 <div>{{data.createdTime | timeToStr}}</div>
 <div>{{data.createdTime | timeToStr('YYYY-MM-DD HH:mm')}}</div>
 //方法里调用 过滤器
 this.$options.filters(time,'YYYY-MM-DD')
 */
import dayjs from 'dayjs'; // 日期格式化

const filters = {
  /**
   * @desc 时间戳转字符串 使用的是mement.js
   * @default YYYY-MM-DD #
   */
  timeToStr(value, formatString = 'YYYY-MM-DD') {
    if (typeof value !== 'number') {
      return '';
    }
    return dayjs(value).format(formatString);
  }, //end
  /**
   * @desc 时间格式化{Number} {string} <30秒=刚刚 >30秒=几分钟前 =几小时前  =x月x日 01:01 
   * @default string='MM月DD HH:mm' #
   */
  formatTime(time, option = 'YYYY-MM-DD HH:mm') {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000
    } else {
      time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return dayjs(time).format(option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  }, //end
  /**
   * @desc 千位分隔符 10000=> 10,000
   * @default #
   */
  milliFormat(num, fixed = 2) {
    num = Number(num || 0);
    return num && num.toFixed(fixed).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  }
}




export default filters;
