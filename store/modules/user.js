const user = {
  state: {
    // 用户认证token
    token: '',
    // 用户ID
    userId: null
  },

  mutations: {
    SET_TOKEN: (state, value) => {
      state.token = value
    },
    SET_USER_ID: (state, value) => {
      state.userId = value
    }
  },

  actions: {

  }
}

export default user
