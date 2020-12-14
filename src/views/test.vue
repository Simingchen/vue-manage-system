<template>
  <div>
    <div class="test">
      测试页面
    </div>
    <div class="wxCode">
      {{wxCode}}
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      wxCode: 1234
    };
  },
  mounted() {
    this.test();
  },
  methods: {
    test() {
      const data = {
        page: 2,
        pageSize: 10,
        cityCode: 0,
        isEnabled: false,
        isClean: true
      };
      // this.$http.get("/witkey/v1/page", data).then(res => {});

      // wxCode
    }
  }
};
</script>
<style lang="scss">
.wxCode {
  color: #ec584e;
  font-weight: 500;
}
</style>
