<template>
  <cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view
      v-for="(item, index) in list"
      :key="index"
      class="tab-bar-item"
      @tap="changeTab(item.pagePath, index)"
    >
      <button class="buttonNoSize" :open-type="item.type">
        <cover-image
          class="icon"
          :src="current === index ? item.selectedIconPath : item.iconPath"
        >
        </cover-image>
        <cover-view class="tbtext">{{ item.text }}</cover-view>
      </button>
      <!-- <cover-image v-else :src="current === index ? item.selectedIconPath : item.iconPath"></cover-image> -->
      <!-- <cover-view>{{item.text}}</cover-view> -->
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  name: "tabbar",
  props: {
    current: Number,
  },
  data() {
    return {
      isShow: true,
      list: [
        {
          selectedIconPath: "../../static/tabbar/indexOn.png",
          iconPath: "../../static/tabbar/index.png",
          text: "首页",
          customIcon: false,
          pagePath: "/pages/index/index",
          type: "",
        },
        {
          selectedIconPath: "../../static/tabbar/customServiceOn.png",
          iconPath: "../../static/tabbar/customService.png",
          text: "在线客服",
          customIcon: false,
          pagePath: "/pages/customer/index",
          type: "contact",
        },
        {
          selectedIconPath: "../../static/tabbar/orderOn.png",
          iconPath: "../../static/tabbar/order.png",
          text: "订单",
          customIcon: false,
          pagePath: "/pages/order/index",
          type: "",
        },
      ],
    };
  },
  created() {
    //隐藏原生tabbar
    uni.hideTabBar();
    // #ifdef H5
    // 去掉tabBar
    this.isShow = false;
    // #endif
  },
  methods: {
    changeTab(url, idx) {
      if (idx != 1) {
        uni.switchTab({
          url,
        });
      }
    },
  },
};
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item cover-image {
  width: 38rpx;
  height: 38rpx;
  margin-bottom: 6rpx;
  display: inline-flex;
}

.tab-bar-item cover-view {
  font-size: 10px;
}

.buttonNoSize {
  border: none;
  background: none;
  outline: none;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  line-height: normal;
  height: 100%;
  width: 100%;
  /* 去除点击后高亮效果 */
  /* -webkit-tap-highlight-color: rgba(0, 0, 0, 0); */
}
.buttonNoSize .tbtext {
  color: #000;
}


.buttonNoSize::after {
  border: none;
}
</style>
