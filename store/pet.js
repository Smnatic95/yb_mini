export default {
  namespaced: true,

  state: () => ({
    petList: JSON.parse(uni.getStorageSync('petList') || "[]"),
  }),

  mutations: {
    // 添加宠物
    addPet(state, pet) {
      console.log(pet)
      state.petList.unshift(pet)
      uni.setStorageSync('petList', JSON.stringify(state.petList))
      uni.$showMsg('添加成功')
      uni.navigateBack(-1)
    },
    
    // 编辑宠物
    editPet(state,pet){
      console.log(pet)
    }
  },


}
