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
  <div v-loading="loading" style="height: 100%">
    <el-form
      :api="demoUser"
      :ref="refs"
      :disabled="disabled"
      :model="value"
      :style="formMinHeight"
      class="d-form-box"
      v-bind="$attrs"
    >
      <slot>
        <d-form-item v-bind="$props">
          <template v-for="(val, key) in $slots" v-slot:[key]>
            <slot :name="key"></slot>
          </template>
        </d-form-item>
      </slot>
    </el-form>
    <div
      v-show="isShowFooter"
      id="formFooter"
      class="ac"
      style="padding-top: 10px; border-top: 1px solid #efefef"
    >
      <slot name="footer">
        <slot name="insBtn"></slot>
        <el-button
          type="primary"
          @click="printForm"
          icon="el-icon-printer"
          v-if="!disabled && btns.includes('print')"
          :size="size"
          v-debounce="2000"
          >打 印</el-button
        >
        <el-button
          type="primary"
          @click="submitForm"
          icon="el-icon-check"
          v-if="!disabled && btns.includes('submit')"
          :size="size"
          v-debounce
          >保 存</el-button
        >
        <el-button
          v-if="btns.includes('cancel')"
          @click="closeForm"
          :size="size"
          >取 消</el-button
        >
      </slot>
    </div>
  </div>
</template>
<script>
// import Sortable from 'sortablejs'
export default {
  name: "d-form",
  props: {
    // v-model对象
    value: {
      required: true,
      type: Object,
    },
    //列表配置项
    option: {
      required: true,
      type: Array,
      default: () => [],
    },
    // form设置ref
    refs: {
      required: true,
      type: String,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    span: {
      type: Number,
      default: 12,
    },

    btns: {
      type: Array,
      default: () => ["submit", "cancel"],
    },
    // 行间距
    lineSpace: {
      type: String,
      default: "15px",
    },
    // el-row gutter 栅格间隔
    gutter: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      loading: false,
      isShowFooter: true,
    };
  },
  created() {},
  mounted() {
    // 判断footer是否有按钮
    this.isShowFooter = document.querySelector("#formFooter").childNodes.length;
  },
  beforeDestroy() {},
  computed: {
    formMinHeight() {
      // 如果是弹出框表格高度 max-height: calc(100vh - 140px) 如果是其余位置height: calc(100% - 35px)
      return this.$parent.$options._componentTag == "el-dialog"
        ? "max-height: calc(100vh - 140px)"
        : "height: calc(100% - 35px)";
    },
  },
  watch: {
    // 监控是否手动请求
  },
  methods: {
    // 关闭表单
    closeForm() {
      // 如果用户自定义取消按钮事件
      if (this.$listeners.cancel) {
        this.$emit("cancel");
      } else {
        if (!this.$util.isEmptyObject(this.$parent.$parent.$listeners)) {
          this.$parent.$parent.$listeners["update:visible"](false);
        } else {
          this.$parent.$listeners["update:visible"](false);
        }
      }
    },
    // 打印
    printForm() {
      this.$emit("print");
    },
    // 表单提交
    async submitForm() {
      let formRef = this.$refs[this.refs];
      try {
        await formRef.validate();
        this.loading = true;
        // 如果父级没有@submit 则直接提交
        if (this.$listeners.submit) {
          this.$emit("submit", this.value, this.done);
        } else {
          this.done();
        }
      } catch (error) {
        formRef.$el
          .querySelector(".el-form-item__error")
          .parentElement.scrollIntoView({
            block: "end",
            inline: "nearest",
            behavior: "smooth",
          });
        throw error;
      }
    },

    done(form) {
      let params = form || this.value;
      this.loading = true;
      this.$api
        .projectUserUsers(params)
        .then((res) => {
          console.log("保存成功");
        })
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    },
  },
};
</script>
<style scoped lang="less">
.e-form-box {
  overflow-y: auto;
  overflow-x: hidden;
}
.el-range-editor.el-input,
.el-range-editor.el-input__inner {
  width: 100%;
}
</style>