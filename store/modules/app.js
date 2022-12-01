
const app = {
  state: {
    // 当前终端平台
    platform: '',

    isIphoneX: '',

    isIphoneXII: ''

  },

  mutations: {
    SET_PLATFORM: (state, value) => {
      state.platform = value
    },
    SET_IS_IPHONEX: (state, value) => {
      state.isIphoneX = value
    },
    SET_IS_IPHONEXII: (state, value) => {
      state.isIphoneXII = value
    },
  },

  actions: {
    // 获取当前终端平台
    getPlatform({ commit }) {
      const platform = getPlatform()
      commit('SET_PLATFORM', platform)
    },
    // 获取当前ios版,
    getIosVersion({ commit }) {
      uni.getSystemInfo({
        success: function (res) {
          console.log(res.deviceModel)
          const isIphoneXFlag = res.deviceModel.indexOf('iPhone X') != -1 || res.deviceModel.indexOf('iPhone13,2') != -1
          commit('SET_IS_IPHONEX', isIphoneXFlag)
          const isIphoneXIIFlag = res.deviceModel.indexOf('iPhone13,2') != -1
          commit('SET_IS_IPHONEXII', isIphoneXIIFlag)

        }
      });
    }
  }
}

export default app



