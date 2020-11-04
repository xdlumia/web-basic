/*
 * @Author: web.王晓冬
 * @Date: 2020-10-29 14:09:42
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-11-03 09:56:07
 * @Description: file content
 */
const ora = require('ora')
const path = require('path')
const spinner = ora('building for production...')
console.log(path);
// spinner.start()
module.exports = {
    entry: 'examples/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my-first-webpack.bundle.js'
    }
  };