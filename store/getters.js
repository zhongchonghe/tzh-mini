const getters = {
  token: state => state.user.token,
  userId: state => state.user.userId,
  platform: state => state.app.platform,
  isIphoneX: state => state.app.isIphoneX,
  isIphoneXII: state => state.app.isIphoneXII,
  loginBack: state => state.app.loginBack,
  statusBarHeight: state => state.app.statusBarHeight,
  navigationBarHeight: state => state.app.navigationBarHeight
}

export default getters
