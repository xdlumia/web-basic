<!--
 * @Author: web.王晓冬
 * @Date: 2020-03-19 10:29:31
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-28 14:22:20
 * @Description: file content
 -->
# e-web-basic

## Project setup
```
npm install
```

### 项目示例启动
```
npm run serve
```

### 项目打包并发布到到npm
```
npm run pub
```
### 使用示例 Install

```
npm install e-web-basic --save  || yarn add e-web-basic
```

```js
//main.js引入
import Vue from 'vue';
import eWebBasic from 'e-web-basic';
import App from './App.vue';
Vue.use(eWebBasic);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');


```
### 基础包说明
```
此基础包含:`公共组件` `公共方法` `自定义指令` `过滤器` `公共css` `以及axios的封装`
```
#### 公共组件
> #### e-table //表格
>
> 使用方式:
> ```js
> <e-table ref="table" api="getDataUrl" params="{name:'wang'}">
> <el-table-column
>  	prop="date"
>  	label="日期"
>  	width="180">
>  </el-table-column>
>  <el-table-column
>  	prop="name"
>  	label="姓名"
>  	width="180">
>  </el-table-column>
> </e-table>
> //重新加载表格
> this.$refs.table.reload(1)
> ```
> Table Attributes:
> |  参数   | 说明  | 类型  | 默认值  |
> |  ----  | :---  |  ----  | ----  |
> | api | 获取数据接口 | string | - |
> | params | 接口请求参数 | object,tring,number | {page:1,limit:15} |
> | page | 是否需要分页 | boolean | true |
> | init | 是否自动初始化 | boolean | true |
> 其余属性以及方法el-table保持一致
> #### e-views  //图片查看
>
> 使用方式:
> ```js
> //支持混合插入 只识别img标签 缺点:如果当前页出img格式的表情也会当前图片查看
> <e-views>
>   <div><img src="/1.png"/><img src="/1.png"/></div>
> </e-views>
> ```


#### 公共方法
> 使用方式:
> ```js
> let obj = {a:{b:2}}
> //深度拷贝对象
> let newObj = this.$util.deepCopy(obj)
> ```
> |  方法名称  | 说明  |
> |  :---  | :---  |
> | $util.deepCopy | 对象深拷贝 |
> | $util.isElement | 判断是不是dom元素 |
> | $util.isWindow | 判断是否是window  |
> | $util.isEmptyObject | 判断是否是空对象  |
> | $util.type | 数据类型判断 |
> | $local.save | 针对localStrong的操作 保存到localStrong里 this.$local.save('name','张三') |
> | $local.fetch | 获取localStrong里的内容 this.$local.fetch('name') |
> | $local.clear | 清空token |
> | $local.key | 获取localStrong里所有keys |


#### 过滤器
> 使用方式:
> ```html
> <div>{{time | timeToStr}}</div>
> ```
> |  名称  | 说明  | 默认参数 |
> |  :---  | :---  |  ----  |
> | timeToStr | 时间戳转字符串 详细参数参考[dayjs](https://dayjs.gitee.io/zh-CN/) | 'YYYY-MM-DD' |
> | toThousand | 千分位分隔符 *10000 => "10,000"* | - |

#### 自定义指令 
> 使用方式:
> ```html
> //弹出框增加拖动指令
> <el-dialog v-dialogDrag></el-dialog>
> ```
> |  名称  | 说明  |
> |  :---  | :---  |
> | v-dialogDrag | 弹出框增加拖动功能|
> | v-clipboard | 复制当前内容到剪贴板 |
> | v-focus | 输入框获得焦点 |

#### elementUi表单自定义验证
> 使用方式:
> ```html
> //验证 输入内容必须是邮箱
> <el-form-item prop="email" label="邮箱"
>   :rules="[
>     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
>     { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
>    ]">
> <el-input v-model="dynamicValidateForm.email"></el-input>
> </el-form-item>
> ```
> | 名称    | 说明                      |
> | ------- | ------------------------- |
> | age     | 年龄,只能是0到120的正整数 |
> | phone   | 手机号验证                |
> | name    | 姓名,只能是中文或者英文   |
> | IDCard  | 身份证验证                |
> | number  | 只能是数字                |
> | price   | 金额验证,小数不能超过两位 |
> | zipCode | 邮编验证                  |

#### axios 封装后的使用方法
> 使用方式:
> ```js
> //请求数据
> getData(){
>   this.loading = true
>   this.$api.getDataApiUrl()
>   .then(res=>{
>     let data = res.data || {}
>   }).finally(res=>{
>     this.loading = false
>   })
> }
> ```

#### 基础包css
> 使用方式:
> ```thml
> //元素距上10px 子元素左浮动 文字居中 
><ui class="mt10 ac"
>     <li class="fl">1</li>
>     <li class="fl">2</li>
>     <li class="fl">3</li>
>     <li class="fl">4</li>
></ui>
>```
```css
body{ background: #fff }
/*字体*/
.b{font-weight: bold;}
.n{font-weight: normal;}
.f12{ font-size: 12px;}
.f13{ font-size: 13px;}
.f14{ font-size: 14px;}
.f15{ font-size: 15px;}
.f16{ font-size: 16px;}
.f18{ font-size: 18px;}
.f20{ font-size: 20px;}
.f22{ font-size: 22px;}
.f24{ font-size: 24px;}
.f26{ font-size: 26px;}
.f28{ font-size: 28px;}
.f30{ font-size: 30px;}
.f35{ font-size: 35px;}

/*边距*/
.m0{margin:0;}
.m5{margin:5px;}
.m10{margin:10px;}
.m15{margin:15px;}
.m20{margin:20px;}
.m25{margin:25px;}
.m30{margin:30px;}
.m35{margin:35px;}


.mt0{margin-top: 0px;}
.mt5{margin-top: 5px;}
.mt10{margin-top: 10px;}
.mt15{margin-top: 15px;}
.mt20{margin-top: 20px;}
.mt25{margin-top: 25px;}
.mt30{margin-top: 30px;}
.mt35{margin-top: 35px;}



.mb0{margin-bottom: 0px;}
.mb5{margin-bottom: 5px;}
.mb10{margin-bottom: 10px;}
.mb15{margin-bottom: 15px;}
.mb20{margin-bottom: 20px;}
.mb25{margin-bottom: 25px;}
.mb30{margin-bottom: 30px;}
.mb35{margin-bottom: 35px;}


.ml0{margin-left:0;}
.ml5{ margin-left: 5px;}
.ml10{ margin-left: 10px;}
.ml15{ margin-left: 15px;}
.ml20{ margin-left: 20px;}
.ml30{ margin-left: 30px;}
.ml35{ margin-left: 35px;}
.ml40{ margin-left: 40px;}
.ml45{ margin-left: 45px;}


.mr0{margin-right: 0px;}
.mr5{ margin-right: 5px;}
.mr10{ margin-right: 10px;}
.mr15{ margin-right: 15px;}
.mr20{ margin-right: 20px;}
.mr25{ margin-right: 25px;}
.mr30{ margin-right: 30px;}
.mr35{ margin-right: 35px;}



/*内边距*/
.p0{padding:0px;}
.p5{padding:5px;}
.p10{padding:10px;}
.p15{padding:15px;}
.p20{padding: 20px;}
.p25{padding: 25px;}
.p30{padding: 30px;}


.pt0{padding-top:0px;}
.pt5{padding-top:5px;}
.pt10{padding-top:10px;}
.pt15{padding-top:15px;}
.pt20{padding-top:20px;}
.pt25{padding-top: 25px;}
.pt30{padding-top: 30px;}
.pt35{padding-top: 35px;}

.pb0{padding-bottom:0px;}
.pb5{padding-bottom:5px;}
.pb10{padding-bottom:10px;}
.pb15{padding-bottom:15px;}
.pb20{padding-bottom:20px;}
.pb25{padding-bottom:25px;}
.pb30{padding-bottom:30px;}
.pb35{padding-bottom:35px;}


.pl0{padding-left:0px;}
.pl5{padding-left:5px;}
.pl10{padding-left:10px;}
.pl15{padding-left:15px;}
.pl20{padding-left:20px;}
.pl25{padding-left: 25px;}
.pl30{ padding-left: 30px}
.pl35{padding-left:35px;}

.pr5{padding-right:5px;}
.pr10{padding-right:10px;}
.pr15{padding-right:15px;}
.pr20{ padding-right: 20px}
.pr25{padding-right: 25px;}
.pr30{ padding-right: 30px}


.ptb5{ padding-top:5px; padding-bottom: 5px; }
.ptb10{ padding-top:10px; padding-bottom: 10px; }


.plr5{padding:0px 5px;}
.plr10{padding:0px 10px;}
.plr20{padding:0px 20px;}


/*布局*/
e-main{ min-width:1200px;}
e-content{
    padding: 10px; 
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,.1);
    border-radius: 3px ;
    box-sizing: border-box; 
}
e-relative{ position: relative; }
e-absolute{ position: absolute;}
e-fixed{position: fixed;}



/*浮动*/
.fl{float: left;}
.fr{float: right}

/*对齐*/
.al{text-align: left;}
.ac{text-align: center;}
.ar{text-align: right;}


/*辅助*/
.e-nowrap{white-space: nowrap;}
.e-elip{text-overflow: ellipsis; overflow: hidden; white-space: nowrap;}
.e-disabled{background: #e8e8e8; color: #999; cursor: not-allowed}
.e-pointer{cursor:pointer;}

.e-show{display: block;}
.e-hide{display: none;}

.e-hidden{overflow: hidden;}
.e-auto-x{overflow-x: auto;}
.e-auto-y{overflow-y: auto;}

.e-fieldset{border:1px solid #d3dce6;border-radius: 2px; }

.e-block{display: block;}
.e-inline{display: inline-block;}

.e-middle{ vertical-align: middle;}
.e-box{box-sizing: border-box;}
.e-clear{clear: both;}




/*高度*/
.hfull{ height: 100%; }

/*宽度*/
.wfull{ width: 100% }



/* 边框   */
.bt{border-top:1px solid #dcdfe6;}
.bb{border-bottom:1px solid #dcdfe6;}
.bl{border-left:1px solid #dcdfe6; }
.br{border-right:1px solid #dcdfe6; }
.ba{border:1px solid #dcdfe6;}
.bn{border:none;}



/*背景色*/
.e-bg-gray{ background:#f2f2f2;}  /*灰色*/
.e-bg-qgray{background: #999; }/*灰色*/
.e-bg-white{ background:#fff;}  /*白色*/
.e-bg-black{ background:#aaa; color: #fff}  /*黑色*/
.e-bg-red{ background:#ff0000;color: #fff }  /*h*/
.e-bg-pink{ background: #ff6969; color: #fff;}/*粉红主色*/
.e-bg-violet{ background: #9965cc; color: #fff;} /*紫色*/
.e-bg-brown{ background: #f1a85f; color: #fff; }/*棕色*/
.e-bg-crimson{ background: #ac0222; color: #fff; }/*赤红*/
.e-bg-cyan{ background: #33ba9b; color: #fff; }/*青色*/
.e-bg-blue{ background: #189eff; color: #fff; }/*蓝色*/
.e-bg-green{ background: #67c23a; color: #fff; }/*绿色*/
.e-bg-orange{ background: #ff9906; color: #fff; }/*橙色*/
.e-bg-yellow{ background: #E6A23C; color: #fff; }/*橙色*/

/*字体颜色*/
.e-text-pink{color: #ff6969; } /*粉红主色*/
.e-text-red{color: #ff0000!important; }  /*红色*/
.e-text-tred{color: #F56C6C;}  /*A/特级红*/
.e-text-violet{color: #9965cc; } /*紫色*/
.e-text-brown{color: #f1a85f; }/*棕色*/
.e-text-gold{color: #ecda42}
.e-text-crimson{color: #ac0222; }/*赤红*/
.e-text-cyan{color: #33ba9b; }/*青色*/
.e-text-blue{color: #189eff; }/*蓝色*/
.e-text-green{color: #67c23a; }/*绿色*/
.e-text-orange{color: #ff9906; }/*橙色*/
.e-text-gray{color: #666; }/*灰色*/
.e-text-qgray{color: #999; }/*灰色*/
.e-text-white{color: #fff; }/*白色*/
.e-text-black{color: #333; }/*黑色*/


/*布局*/
.e-flex{
	display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box; /* Firefox 17- */
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    display: -moz-flex; /* Firefox 18+ */
    display: -ms-flexbox; /* IE 10 */
    display: flex;
 }
.e-flex-center{display: flex; flex-flow: wrap; align-items: center; justify-content:center}
/* 从左到右垂直居中 */
.e-flex-lr{
    display: flex;
    align-items: center;
}

/* 分布两边 */
.e-flex-level{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
/* 上中下分布 */
.e-flex-tcb{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
.e-cell{flex: 1}
.e-shrink{flex-shrink:1;}
/* 水平垂直居中 */


```
------



### 项目文件夹说明

```
│  README.md
│  vue.config.js                        //vuecli 配置文件
│  yarn.lock
│  
├─bin                              //基础包构建并且发布的目录,文件夹内容会上传到npm npm run pub
│      demo.html
│      e-web-basic.common.js
│      e-web-basic.common.js.map
│      e-web-basic.umd.js
│      e-web-basic.umd.js.map
│      e-web-basic.umd.min.js
│      e-web-basic.umd.min.js.map
│      
├─dist                                  //基础包示例打构建后的目录 npm run build 
│      demo.html
│      e-web-basic.common.js
│      e-web-basic.common.js.map
│      e-web-basic.umd.js
│      e-web-basic.umd.js.map
│      e-web-basic.umd.min.js
│      e-web-basic.umd.min.js.map
│      
├─examples                              //基础包 示例目录 方便调试公共包的内容
│  │  App.vue
│  │  main.js
│  │  
│  ├─assets
│  │      logo.png
│  │      
│  └─components
│          HelloWorld.vue
│          
├─packages                              //基础包源文件
│  │  index.js
│  │  
│  ├─components                         //基础包组件
│  │      HelloWorld.vue
│  │      index.js
│  │      text-button.vue
│  │      
│  └─utils                              //基础包工具
│          element-extend.js            //公共过滤器
│          filters.js
│          utils.js                     //工具
│          verify.js                    //公共验证
│          
└─public                                示例模板
        favicon.ico
        index.html
        
```

