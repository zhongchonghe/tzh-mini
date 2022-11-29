<template>
  <view class="content">
    <text>首页</text>
  </view>
</template>

<script>

import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "Hello",
    };
  },
  computed: {
    ...mapState({
      platform: (state) => state.app.platform,
    }),
  },
  onLoad() {
    // #ifdef H5
    console.log("h5");
	// 去掉tabbar
	this.$store.commit("app/SET_TABBAR", false);
    // #endif
    // #ifdef MP
    console.log("小程序");
    // #endif
  },
  methods: {},
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
