export default {
  namespaced: true,

  state: () => ({
    areas: JSON.parse(uni.getStorageSync('areas') || "[]"),
    address_list: JSON.parse(uni.getStorageSync('address_list') || "[]"),
    is_public_address: JSON.parse(uni.getStorageSync('is_public_address') || "false"),
    default_address_id: JSON.parse(uni.getStorageSync('default_address_id') || "null"),
  }),

  mutations: {
    // 更新地址
    updateAddress(state, addressList) {
      state.address_list = addressList
      uni.setStorageSync('address_list', JSON.stringify(state.address_list))
    },

    // 更新默认地址
    updateDefaultAddress(state, id) {
      state.default_address_id = id
      uni.setStorageSync('default_address_id', JSON.stringify(state.default_address_id))
    },

    // 修改地址
    editAddress(state, address) {
      const arr = JSON.parse(uni.getStorageSync('address_list') || "[]")

      arr.forEach((item, idx) => {
        if (item.address_id == address.address_id) {
          return arr[idx] = address
        }
      })
      state.address_list = arr
      uni.setStorageSync('address_list', JSON.stringify(state.address_list))
    },

    // 添加地址
    addAddress(state, address) {
      console.log(address)
      state.address_list.unshift(address)
      uni.setStorageSync('address_list', JSON.stringify(state.address_list))
    },

    // 删除地址
    delAddress(state, id) {
      // console.log(id)
      const idx = state.address_list.findIndex(x => x.address_id == id)
      console.log(idx)
      state.address_list.splice(idx, 1)
      uni.setStorageSync('address_list', JSON.stringify(state.address_list))
    },

    // 更新公益地址
    updatePublicAddress(state, status) {
      console.log(status)
      state.is_public_address = status
      uni.setStorageSync('is_public_address', JSON.stringify(state.is_public_address))
    },

    // 更新省市区
    updateAreas(state, list) {
      state.areas = list
      uni.setStorageSync('areas', JSON.stringify(state.areas))
    }

  },

  getters: {},
}
