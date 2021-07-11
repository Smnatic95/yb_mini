export default {
  namespaced: true,

  state: () => ({
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || "{}"),
    token: JSON.parse(uni.getStorageSync('token') || "false"),
  }),

  mutations: {
    // 修改用户信息
    updateUserInfo(state, user) {
      state.userInfo = user
      console.log(state.userInfo)
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },

    // 更新token
    undateToken(state, token) {
      state.token = token
      uni.setStorageSync('token', JSON.stringify(state.token))
    }
  },



}
