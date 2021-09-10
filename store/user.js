export default {
  namespaced: true,
  state: () => ({
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || "{}"),
    token: JSON.parse(uni.getStorageSync('token') || "false"),
    collectList: JSON.parse(uni.getStorageSync('collectList') || "false"),
    signList: JSON.parse(uni.getStorageSync('signList') || "false"),
  }),
  mutations: {
    // 修改用户信息
    updateUserInfo(state, user) {
      state.userInfo = user
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },

    // 更新token
    undateToken(state, token) {
      state.token = token
      uni.setStorageSync('token', JSON.stringify(state.token))
    },

    // 更新收藏列表
    updateCollect(state, list) {
      state.collectList = list
      uni.setStorageSync('collectList', JSON.stringify(state.collectList))
    },

    // 取消收藏
    deleteCollect(state, id) {
      state.collectList = state.collectList.filter(x => x.id !== id)
      uni.setStorageSync('collectList', JSON.stringify(state.collectList))
    },

    // 更新签到列表
    updateSignList(state, list) {
      state.signList = list
      uni.setStorageSync('signList', JSON.stringify(state.signList))
    },
    // 签到
    updateSignStatus(state, i) {
      state.signList[i - 1].num = 1
      uni.setStorageSync('signList', JSON.stringify(state.signList))
    },
    reLoadUserInfo(state) {
      let state1 = {
        userInfo: JSON.parse(uni.getStorageSync('userInfo') || "{}"),
        token: JSON.parse(uni.getStorageSync('token') || "false"),
        collectList: JSON.parse(uni.getStorageSync('collectList') || "false"),
        signList: JSON.parse(uni.getStorageSync('signList') || "false"),
      }
      Object.keys(state1).forEach((key) => {
        state[key] = state1[key];
      })
    }
  },
}
