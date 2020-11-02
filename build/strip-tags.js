/*
 * @Author: web.王晓冬
 * @Date: 2020-10-29 13:48:31
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-29 13:48:54
 * @Description: <https://github.com/jonschlinkert/strip-tags>
 */

'use strict';

var cheerio = require('cheerio');

exports.strip = function(str, tags) {
  var $ = cheerio.load(str, {decodeEntities: false});

  if (!tags || tags.length === 0) {
    return str;
  }

  tags = !Array.isArray(tags) ? [tags] : tags;
  var len = tags.length;

  while (len--) {
    $(tags[len]).remove();
  }

  return $.html();
};

exports.fetch = function(str, tag) {
  var $ = cheerio.load(str, {decodeEntities: false});
  if (!tag) return str;

  return $(tag).html();
};