/*
 * @Author: web.王晓冬
 * @Date: 2020-05-27 18:25:06
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-05-27 18:28:28
 * @Description: file content
*/
<template>
  <el-dialog v-dialogDrag title="afsda" :visible.sync="visible">
    <e-form
      api="apiService"
      refs="form"
      @submit="submit"
      size="small"
      label-width="120px"
      v-model="form"
      :option="option"
    >
      <template v-slot:key5>
        根据key的值自定义元素
        <el-button>按钮</el-button>
      </template>
    </e-form>
  </el-dialog>
</template>

<script>
let formItem = [
  {
    label: "所有者:",
    prop: "key1",
    type: "text",
    append: "132",
    rules: { required: true },
    change: val => {
      console.log(val);
    }
  },
  { label: "创建者:", prop: "key1", type: "select" },
  {
    label: "日期1:",
    prop: "key1",
    type: "daterange",
    span: 12,
    change: e => {
      console.log(11);
    }
  },
  { label: "日期2:", prop: "key1", type: "datetimerange", span: 12 },
  { label: "处理状态:", prop: "key1", type: "radio", options: [1, 2] },
  { label: "子站点:", prop: "key1", type: "checkbox", options: [1, 2] },
  { label: "日期:", prop: "key1", type: "datetime" },
  { label: "省市:", prop: "key1", type: "cascader" },
  { label: "省市:", prop: "key1", type: "switch" },
  { label: "省市:", prop: "key1", type: "colorPicker" },
  { label: "关键词:", prop: "key1", type: "textarea", span: 24 }
];
formItem = formItem.map((v, i) => {
  v.prop = `key${i}`;
  return v;
});

export default {
  name: "msg",
  props: {
    visible: Boolean
  },
  data() {
    return {
      form: {
        key5: [1]
      },
      option: formItem
    };
  },
  computed: {
    isShow: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", false);
      }
    }
  },
  methods: {
    submit(form, done) {
      if (!form.key0) {
        return;
      }
      console.log("走了父级");
      done({ a: 1 });
    }
  },
  created() {
    // axios.get(
    //   "http://git.kinfe.net/api/v4/projects/21/repository/commits?per_page=100&page=1&private_token=Wz6K47F6HKPp1RUYTKxd&ref=dev",
    //   { wang: 123 }
    // );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  padding: 10px;
}
</style>
