// 顶部搜索控件
<template>
  <div>
    <el-input v-model.trim="input" :placeholder="placeholder" class="input" size="small" style="width:220px" maxlength="30" @keyup.enter.native="search">
      <el-button slot="prefix" class="p0" style="color:#A8A8A8" type="text" @click.native="search">
        <i class="el-input__icon el-icon-search" />
      </el-button>
      <el-button slot="append" @click="visible=true">
        <el-popover popper-class="filterInput" v-model="visible" placement="bottom" title="筛选条件" width="340">
          <i slot="reference" class="iconfont iconguolv"></i>
          <slot />
        </el-popover>
      </el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    input: {
      // 输入框
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: "请输入搜索条件"
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    search() {
      this.$emit("search", this.input);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-popover {
  left: 192px;
}
.input {
  float: left;
  width: 190px;
}
.p0 {
  padding: 0;
}
</style>
<style lang="scss">
.filterInput {
  .footr-popover {
    width: 338px;
    margin-left: -12px;
    margin-bottom: -12px;
    background: #f4f6f9;
    padding: 10px 30px 10px 10px;
    text-align: right;
  }
  .el-popover__title {
    color: black !important;
    font-weight: 520;
    padding-top: 10px;
  }
}
</style>
