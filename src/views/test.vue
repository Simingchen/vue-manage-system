<template>
  <div class="test">
    测试页面
  </div>
</template>

<script>
export default {
  data() {
    return {
      driver: null
    };
  },
  mounted() {
    const data = {
      page: 2,
      pageSize: 10,
      cityCode: 0,
      isEnabled: false,
      isClean: true
    };
    this.$http.get("/witkey/v1/page", data).then(res => {
      console.log(res);
    });
  },
  methods: {
    test() {}
  }
};
</script>
<style lang="scss">
@import "../styles/element-variables.scss";
// $--color-primary: #ec584e;
.test {
  color: $--color-primary;
}
</style>
