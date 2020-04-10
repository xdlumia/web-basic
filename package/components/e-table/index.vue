/**
* @Author: web.王晓冬
* @Date: 2019-10-31 20:01:21
* @LastEditors: web.王晓冬
* @LastEditTime: 2020-03-24 14:01:13
* @Description: file content
* @author web-王晓冬
* @date 2018年9月10日
* @param api {String}                  ---api接口 微服务名称.url方法名称  必填
* @param params {Object}               ---接口参数;  默认{ page: 1, limit: 15 }
* @param size {String}                 ---表格size 
* @param autoInit {String}                 ---表格size 
* @param page {Boole}                ---是否显示分页   默认true
* @param dragClass {string}             ---是否拖动 以及为列表中对象设置手柄，按住对象的拖动手柄才可以进行拖动  
* @param rowClassName {string function} ---定义拖动的class. 返回参数要和dragClass相同. 具体使用方式参考element ui
* @param slot                          ---slot
* @fucnton dragEnd  ---拖动结束的参数. 返回拖动修改后的数据
**/

<template>
  <div>
    <!-- 表格数据 -->
    <el-table
      :row-key="rowKey"
      :class="dragClass"
      :height="tableHeight"
      :row-class-name="rowClassName"
      highlight-current-row
      :data="tableData"
      :reserve-selection="true"
      :border="border"
      :style="{height:tableHeight}"
      v-loading="loading"
      :size="size"
      @sort-change="sortChange"
      @selection-change="selectionChange"
      @current-change="currentChange"
      @row-click="rowClick"
      style="width: 100%;"
      :summary-method="summaryMethod"
      :show-summary="showSummary"
      ref="elTable"
    >
      <slot></slot>
    </el-table>
    <el-pagination
      v-if="page"
      @size-change="init(params)"
      @current-change="init(params)"
      :current-page.sync="params.pageNum"
      :page-size.sync="params.size"
      :page-sizes="[10, 15, 20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableCount"
    ></el-pagination>
  </div>
</template>
<script>
// import Sortable from 'sortablejs'
export default {
  name: "e-table",
  props: {
    //请求接口
    api: {
      required: true
    },
    //参数
    params: {
      type: [Object, String, Number],
      default: function() {
        return { pageNum: 1, size: 15 };
      }
    },
    // 尺寸
    size: {
      type: String,
      default: "small"
    },
    // border
    border: {
      type: Boolean,
      default: true
    },
    // 分页
    page: {
      type: Boolean,
      default: true
    },
    dragClass: {
      type: String,
      default: "elTableDragDefault"
    },
    // 自定义行class
    rowClassName: {
      default: function() {
        return this.dragClass;
      }
    },
    // 是否显示合计
    showSummary: {
      type: Boolean,
      default: false
    },
    // 合计方法
    summaryMethod: {
      type: Function
    },

    // 自动调用接口请求
    autoInit: {
      default: true
    },
    rowKey: {
      type: String,
      default: "id"
    }
  },
  data() {
    return {
      tableCount: 0, //总条数
      tableData: [], //表格数据
      loading: false, //loading动画
      // 返回所有响应数据
      response: {}
    };
  },
  created() {
    if (this.autoInit) {
      this.init(this.params);
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.dragClass !== "elTableDragDefault") {
        // this.rowDrop()
      }
    });
    window.addEventListener("resize", this.resizeTable);
  },
  beforeDestroy() {
    window.removeEventListener("reset", this.resizeTable);
  },
  computed: {
    tableHeight: function() {
      return this.page ? "calc(100% - 32px)" : "100%";
    }
  },
  watch: {
    // 监控是否手动请求
    autoInit(val) {
      if (val) {
        this.init(this.params);
      }
    }
  },
  methods: {
    resizeTable() {
      this.$nextTick(() => {
        if (this.$refs.elTable) {
          this.$refs.elTable.resizeListener();
          this.$refs.elTable.doLayout();
        }
      });
    },
    init(params) {
      if (!this.api) {
        // 获取组件name
        let compName = this.$parent.$options.name;
        console.error(`[${compName}]组件没有添加api参数`);
        return;
      }
      this.loading = true;
      let apis = this.api.split(".");
      apis
        .reduce((data, path, index) => {
          if (apis.length == 1 && !data[path]) {
            console.error(`没有[${path}]这个接口方法`);
          } else if (apis.length == 2 && index == 0 && !data[path]) {
            console.error(`接口里没有[${path}]这个服务`);
          } else if (apis.length == 2 && index == 1 && !data[path]) {
            console.error(`[${apis[0]}]服务里没有[${path}]这个接口方法`);
          }
          this.loading = false;
          return data[path];
        }, this.$api)(params)
        .then(res => {
          this.response = res || {};
          this.tableData = res.data.records || [];
          this.$emit("response", res || {});
          // 如果有分页
          if (this.page) {
            this.tableCount = res.total || 0;
            this.params.pageNum = res.pageNum || 0;
          }
        })
        .finally(() => {
          //关闭loading
          this.loading = false;
          this.resizeTable();
        });
    },
    // 重新请求
    reload(pageNum) {
      // 如果有分页
      if (this.page && pageNum) {
        this.params.pageNum = pageNum;
      }
      // api动态加载完 开始重新请求数据
      this.$nextTick(() => {
        this.init(this.params);
      });
    },
    // 多选
    selectionChange(val) {
      this.$emit("selection-change", val);
    },
    // 单选
    currentChange(currentRow, oldCurrentRow) {
      this.$emit("current-change", currentRow, oldCurrentRow);
    },
    rowClick(row, event, column) {
      this.$emit("row-click", row, event, column);
    },
    // 排序
    sortChange(column, prop, order) {
      this.$emit("sort-change", column, prop, order);
    },
    // 表格翻页
    // pageChange(pageNum) {
    //   this.params.pageNum = pageNum;
    //   this.init(this.params);
    // },
    // 清空多选
    clearSelection() {
      this.$refs.elTable.clearSelection();
    },
    // 行拖动
    rowDrop() {
      const tbody = document.querySelector(
        `.${this.dragClass} .el-table__body-wrapper tbody`
      );
      const _this = this;
      Sortable.create(tbody, {
        handle:
          this.dragClass == "elTableDragDefault" ? "" : `.${this.dragClass}`,
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow);
          _this.$emit("dragEnd", _this.tableData);
        }
      });
    }
  }
};
</script>