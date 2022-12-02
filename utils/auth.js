// 判断用户是否登录
export const isAuth = () => {
	const accessToken = uni.getStorageSync('accessToken')
	if (!accessToken) {
		// 跳转登录页
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}

}
