export default {
  namespaced: true,

  state: () => ({
    petList: JSON.parse(uni.getStorageSync('petList') || "[]"),
  }),

  mutations: {
    addPet(state, pet) {
      console.log(pet)
      state.petList.unshift(pet)
      uni.setStorageSync('petList', JSON.stringify(state.petList))
      uni.$showMsg('添加成功')
      uni.switchTab({
        url: '/pages/my/my'
      })
    }
  },


}
