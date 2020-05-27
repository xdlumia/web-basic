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
  <div v-loading="loading">
    <el-form
      :ref="refs"
      :disabled="disabled"
      :model="value"
      class="e-form-box"
      :size="size"
      :label-width="labelWidth"
    >
      <slot>
        <el-row :gutter="gutter">
          <el-col
            :style="`margin-bottom:${lineSpacing}`"
            class="mb15"
            :span="item.span || 12"
            v-for="item of option"
            :key="item.prop"
          >
            <el-form-item
              :label="item.label"
              :prop="item.prop"
              :rules="item.rules"
              style="margin-bottom:0"
            >
              <slot :name="item.prop">
                <el-input
                  @input="change(item)"
                  class="wfull"
                  :maxlength="item.maxlength"
                  :placeholder="`请输入${item.label}`"
                  v-if="['text','textarea','password'].includes(item.type)"
                  :show-password="item.type=='password'"
                  :type="item.type"
                  v-model.trim="value[item.prop]"
                >
                  <template
                    v-if="item.prepend ||item.append"
                    :slot="item.append?'append':'prepend'"
                  >{{item.prepend || item.append}}</template>
                </el-input>
                <el-select
                  class="wfull"
                  :disabled="item.disabled"
                  :placeholder="`请输入${item.label}`"
                  v-else-if="item.type =='select'"
                  v-model="value[item.prop]"
                >
                  <el-option
                    :key="subItem.code"
                    :label="subItem.content"
                    :value="subItem.code"
                    v-for="subItem in item.options||[]"
                  />
                </el-select>
                <el-checkbox-group
                  :disabled="item.disabled"
                  v-else-if="item.type =='checkbox'"
                  v-model="value[item.prop]"
                  :placeholder="`请输入${item.label}`"
                >
                  <el-checkbox
                    :key="subItem.code"
                    :label="subItem.value"
                    :value="subItem.code"
                    v-for="subItem in item.options||[]"
                  >{{subItem.lable}}</el-checkbox>
                </el-checkbox-group>
                <el-radio-group
                  :disabled="item.disabled"
                  v-else-if="item.type =='radio'"
                  v-model="value[item.prop]"
                  :placeholder="`请输入${item.label}`"
                >
                  <el-radio
                    :key="subItem.code"
                    :label="subItem.value"
                    :value="subItem.code"
                    v-for="subItem in item.options||[]"
                  >{{subItem.lable}}</el-radio>
                </el-radio-group>
                <el-date-picker
                  v-else-if="['daterange','datetimerange','datetime','date','week','month','year','dates'].includes(item.type)"
                  class="wfull"
                  @change="change(item)"
                  :disabled="item.disabled"
                  :placeholder="`请选择${item.label}`"
                  start-placeholder="开始日期"
                  range-separator="至"
                  end-placeholder="结束日期"
                  :type="item.type"
                  v-model="value[item.prop]"
                  value-format="timestamp"
                />
                <el-cascader
                  v-else-if="item.type =='cascader'"
                  v-model="value[item.prop]"
                  :disabled="item.disabled"
                  :options="item.options||[]"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
                <el-switch
                  v-else-if="item.type =='switch'"
                  style="display: block"
                  v-model="value[item.prop]"
                  :disabled="item.disabled"
                  :active-value="1"
                  :inactive-value="0"
                  :active-text="item.activeText"
                  :inactive-text="item.inactiveText"
                ></el-switch>
                <el-color-picker v-else-if="item.type =='colorPicker'" v-model="value[item.prop]"></el-color-picker>
              </slot>
            </el-form-item>
          </el-col>
        </el-row>
      </slot>
    </el-form>
    <div class="ac" style="padding-top:10px; border-top:1px solid #efefef">
      <slot name="footer">
        <el-button
          type="primary"
          @click="printForm"
          icon="el-icon-printer"
          v-if="!disabled"
          :size="size"
          v-debounce="3000"
        >打 印</el-button>
        <el-button
          type="primary"
          @click="submitForm"
          icon="el-icon-check"
          v-if="!disabled"
          :size="size"
          v-debounce
        >保 存</el-button>
        <el-button v-if="!disabled" @click="closeForm" :size="size">取 消</el-button>
      </slot>
    </div>
  </div>
</template>
<script>
// import Sortable from 'sortablejs'
export default {
  name: "e-form",
  props: {
    value: {
      required: true,
      type: Object
    },
    refs: {
      required: true,
      type: String
    },
    //请求接口
    option: {
      required: true,
      type: Array,
      default: []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 行间距
    lineSpacing: {
      type: String,
      default: "15px"
    },
    //参数
    labelWidth: {
      type: String
    },
    gutter: {
      type: Number,
      default: 0
    },
    // 尺寸
    size: {
      type: String
    }
  },
  data() {
    return {
      loading: false,
      a: ""
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {
    // 监控是否手动请求
  },
  methods: {
    change(item) {
      if (item.change) {
        item.change(this.value[item.prop]);
      }
    },
    // 关闭表单
    closeForm() {
      try {
        this.$parent.$parent.visible = false;
      } catch {
        this.$emit("cancel");
      }
    },
    // 打印
    printForm() {
      console.log("打印成功");
    },
    // 表单提交
    async submitForm() {
      let formRef = this.$refs[this.refs];

      try {
        await formRef.validate();
        this.loading = true;
        // 如果父级没有@submit 则直接提交
        if (this.$options._parentListeners.submit) {
          this.$emit("submit", this.value, this.done);
        } else {
          this.done();
        }
      } catch (error) {
        formRef.$el
          .querySelector(".el-form-item__error")
          .parentElement.scrollIntoView(false, {
            behavior: "smooth"
          });
        throw error;
      }
    },

    done(form) {
      let params = form || this.value;
      this.loading = true;
      this.$api
        .projectUserUsers(params)
        .then(res => {
          console.log("保存成功");
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.e-form-box {
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  overflow-x: hidden;
}
.el-date-editor {
  // height: 32px;
}
.el-range-editor.el-input,
.el-range-editor.el-input__inner {
  width: 100%;
}
</style>