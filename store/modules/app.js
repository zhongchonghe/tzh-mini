const app = {
  state: {
    // 当前终端平台
    platform: "",

    isIphoneX: "",

    isIphoneXII: "",

    // 是否显示底部tabbar
    isShowTab: true,
    // 返回首页
    loginBack: false,
    statusBarHeight: 0,
    navigationBarHeight: 0,
  },

  mutations: {
    SET_PLATFORM: (state, value) => {
      state.platform = value;
    },
    SET_IS_IPHONEX: (state, value) => {
      state.isIphoneX = value;
    },
    SET_IS_IPHONEXII: (state, value) => {
      state.isIphoneXII = value;
    },
    SET_IS_SHOWTAB: (state, value) => {
      state.isShowTab = value;
    },
    SET_LOGIN_BACK: (state, value) => {
      state.loginBack = value;
    },
    SET_STATUS_BAR_HEIGHT: (state, value) => {
      state.statusBarHeight = value;
    },
    SET_NAVIGATION_BAR_HEIGHT: (state, value) => {
      state.navigationBarHeight = value;
    },
  },

  actions: {
    // 获取当前终端平台
    getPlatform({ commit }) {
      const platform = getPlatform();
      commit("SET_PLATFORM", platform);
    },
    // 获取当前ios版,
    getIosVersion({ commit }) {
      uni.getSystemInfo({
        success: function (res) {
          console.log(res.deviceModel);
          const isIphoneXFlag =
            res.deviceModel.indexOf("iPhone X") != -1 ||
            res.deviceModel.indexOf("iPhone13,2") != -1;
          commit("SET_IS_IPHONEX", isIphoneXFlag);
          const isIphoneXIIFlag = res.deviceModel.indexOf("iPhone13,2") != -1;
          commit("SET_IS_IPHONEXII", isIphoneXIIFlag);
        },
      });
    },
    // 设置是否显示底部tabbar
    setIsShowTab({ commit }) {
      // #ifdef MP
      commit("SET_IS_SHOWTAB", true);
      // #endif

      // #ifndef MP
      commit("SET_IS_SHOWTAB", false);

      // #endif
    },
    // 设置返回首页
    setLoginBack({ commit }, value) {
      commit("SET_LOGIN_BACK", value);
    },
    // 获取当前导航栏高度
    getNavigationBarHeight({ commit }) {
      uni.getSystemInfo({
        success: function (res) {
          const navigationBarHeight = res.statusBarHeight + 44;
          commit("SET_NAVIGATION_BAR_HEIGHT", navigationBarHeight);
        },
      });

      uni.getSystemInfo({
        success: (data) => {
          const custom = uni.getMenuButtonBoundingClientRect();
          commit("SET_STATUS_BAR_HEIGHT", data.statusBarHeight);
          //导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度。
          const height = custom.bottom + custom.top - data.statusBarHeight;
          commit("SET_NAVIGATION_BAR_HEIGHT", height);
        },
      });
    },
  },
};

export default app;
