export default {
  namespaced: true,

  state: () => ({
    areas: JSON.parse(uni.getStorageSync('areas') || "[]"),
    address_list: JSON.parse(uni.getStorageSync('address_list') || "[]"),
    is_public_address: JSON.parse(uni.getStorageSync('is_public_address') || "false"),
    // is_public_address:false
  }),

  mutations: {
    // 修改地址
    updateAddress(state, address) {
      const arr = [...state.address_list]
      if (address.is_default) {
        arr.forEach((item) => {
          item.is_default = false
        })
      }
      arr.forEach((item, index) => {
        if (item.id == address.id) {
          arr[index] = address
        }
      })

      state.address_list = [...arr]

      uni.setStorageSync('address_list', JSON.stringify(state.address_list))
      uni.$showMsg('修改成功')
      setTimeout(() => {
        uni.navigateBack(-1)
      }, 1000)
    },

    // 添加地址
    addAddress(state, address) {
      console.log(address)
      state.address_list.push(address)
      uni.setStorageSync('address_list', JSON.stringify(state.address_list))
      uni.$showMsg('添加成功')
      setTimeout(() => {
        uni.navigateBack(-1)
      }, 1000)
    },

    // 删除地址
    delAddress(state, id) {
      // console.log(id)
      const idx = state.address_list.findIndex(x => x.id == id)
      console.log(idx)
      state.address_list.splice(idx, 1)
      uni.setStorageSync('address_list', JSON.stringify(state.address_list))
      // setTimeout(()=>{
        uni.$showMsg('删除成功')
      // },)
    },

    // 更新公益地址
    updatePublicAddress(state, status) {
      console.log(status)
      state.is_public_address = status
      uni.setStorageSync('is_public_address', JSON.stringify(state.is_public_address))
    },

  },

  getters: {},
}
