<script>
export default {
  onLaunch: function () {
    console.log(process.env);
    console.log(process.env.NODE_ENV);
	// #ifdef H5
    console.log("App Launch");
    console.log("App Launch=========================");
    uni.hideTabBar();
	// #endif
    // 调用vuex的getIosVersion
    this.$store.dispatch("getIosVersion");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
@import url("static/css/common.css");
</style>
