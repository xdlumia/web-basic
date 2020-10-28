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
  <el-row :gutter="gutter">
    <el-col
      :style="`margin-bottom:${lineSpace}`"
      class="mb15"
      :span="item.span || span"
      v-for="item of option"
      :key="item.prop"
    >
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
        style="margin-bottom: 0"
      >
        <slot :name="item.prop">
          <el-input
            @input="change(item)"
            class="wfull"
            :maxlength="item.maxlength"
            :placeholder="`请输入${item.label}`"
            v-if="['text', 'textarea', 'password'].includes(item.type)"
            :show-password="item.type == 'password'"
            :type="item.type"
            v-model.trim="value[item.prop]"
          >
            <template
              v-if="item.prepend || item.append"
              :slot="item.append ? 'append' : 'prepend'"
              >{{ item.prepend || item.append }}</template
            >
          </el-input>
          <el-select
            @input="change(item)"
            class="wfull"
            :disabled="item.disabled"
            :placeholder="`请输入${item.label}`"
            v-else-if="item.type == 'select'"
            v-model="value[item.prop]"
          >
            <el-option
              :key="subItem.code"
              :label="subItem.label"
              :value="subItem.value"
              v-for="subItem in item.dic || []"
            />
          </el-select>
          <el-checkbox-group
            :disabled="item.disabled"
            v-else-if="item.type == 'checkbox'"
            v-model="value[item.prop]"
            :placeholder="`请输入${item.label}`"
          >
            <el-checkbox
              :key="subItem.code"
              :label="subItem.value"
              v-for="subItem in item.dic || []"
              >{{ subItem.label }}</el-checkbox
            >
          </el-checkbox-group>
          <el-radio-group
            :disabled="item.disabled"
            v-else-if="item.type == 'radio'"
            v-model="value[item.prop]"
            :placeholder="`请输入${item.label}`"
          >
            <el-radio
              :key="subItem.code"
              :label="subItem.value"
              v-for="subItem in item.dic || []"
              >{{ subItem.label }}</el-radio
            >
          </el-radio-group>
          <el-date-picker
            v-else-if="
              [
                'daterange',
                'datetimerange',
                'datetime',
                'date',
                'week',
                'month',
                'year',
                'dates',
              ].includes(item.type)
            "
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
            v-else-if="item.type == 'cascader'"
            v-model="value[item.prop]"
            :disabled="item.disabled"
            :options="item.dic || []"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
          <el-switch
            v-else-if="item.type == 'switch'"
            style="display: block"
            v-model="value[item.prop]"
            :disabled="item.disabled"
            :active-value="1"
            :inactive-value="0"
            :active-text="item.activeText"
            :inactive-text="item.inactiveText"
          ></el-switch>
          <el-color-picker
            v-else-if="item.type == 'colorPicker'"
            v-model="value[item.prop]"
          ></el-color-picker>
        </slot>
      </el-form-item>
    </el-col>
  </el-row>
</template>
<script>
// import Sortable from 'sortablejs'
export default {
  name: "e-form-item",
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
    span: {
      type: Number,
      default: 12,
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
  mounted() {},
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
    change(item) {
      if (item.change) {
        item.change(this.value[item.prop]);
      }
    },
  },
};
</script>
<style scoped lang="less">
.el-range-editor.el-input,
.el-range-editor.el-input__inner {
  width: 100%;
}
</style>