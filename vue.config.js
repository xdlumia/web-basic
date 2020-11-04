/*
 * @Author: web.王晓冬
 * @Date: 2020-03-19 10:34:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-11-03 16:29:29
 * @Description: file content
 */
module.exports = {
  
  // 修改 src 目录 为 examples 目录
  css: {
    extract: false
  },
  outputDir: 'dist',
  //   //   是否生成map文件
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },

  
};
