// 重定向页面，tagsview 中操作刷新页面，url 并没有任何变化，不会触发任何钩子或者是 view 的变化，
// 因此先跳转到一个专门 Redirect 的页面，它会将路由重定向到我想去的页面，这样就起到了刷新的效果
<script>
export default {
  created() {
    const { params, query } = this.$route;
    const { path } = params;
    this.$router.replace({ path: "/" + path, query });
  },
  render: function(h) {
    return h(); // avoid warning message
  }
};
</script>
