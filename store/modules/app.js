const app = {
	state: {
		// 当前终端平台
		platform: '',

		isIphoneX: '',

		isIphoneXII: '',

		// 是否显示底部tabbar
		isShowTab: true

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
		SET_IS_SHOWTAB: (state, value) => {
			state.isShowTab = value
		},
	},

	actions: {
		// 获取当前终端平台
		getPlatform({
			commit
		}) {
			const platform = getPlatform()
			commit('SET_PLATFORM', platform)
		},
		// 获取当前ios版,
		getIosVersion({
			commit
		}) {
			uni.getSystemInfo({
				success: function(res) {
					console.log(res.deviceModel)
					const isIphoneXFlag = res.deviceModel.indexOf('iPhone X') != -1 || res.deviceModel
						.indexOf('iPhone13,2') != -1
					commit('SET_IS_IPHONEX', isIphoneXFlag)
					const isIphoneXIIFlag = res.deviceModel.indexOf('iPhone13,2') != -1
					commit('SET_IS_IPHONEXII', isIphoneXIIFlag)

				}
			});
		},
		// 设置是否显示底部tabbar
		setIsShowTab({
			commit
		}, value) {
			// #ifdef MP
			commit('SET_IS_SHOWTAB', true)
			// #endif

			// #ifndef MP
			commit('SET_IS_SHOWTAB', false)

			// #endif
		}

	}
}

export default app
