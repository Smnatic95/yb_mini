export default {
  namespaced: true,

  state: () => ({
    cart_list: JSON.parse(uni.getStorageSync('goods_list') || "[]")
  }),

  mutations: {
    // 加入购物车
    addToCart(state, goods) {
      const findRes = state.cart_list.find(item => item.goods_id == goods.goods_id)
      if (!findRes) {
        state.cart_list.unshift(goods)
      } else {
        findRes.goods_count++
        findRes.is_checked = true
      }
      uni.setStorageSync('goods_list', JSON.stringify(state.cart_list))
      uni.$showMsg("添加成功~")
    },

    // 更新加购数量
    updateGoodsCount(state, goods) {
      const findRes = state.cart_list.find(x => x.goods_id == goods.goods_id)
      if (!findRes) return
      findRes.goods_count = goods.goods_count
      uni.setStorageSync('goods_list', JSON.stringify(state.cart_list))
    },

    // 根据id删除购物车商品
    removeGoodsById(state, id) {
      console.log(id)
      state.cart_list = state.cart_list.filter(x => x.goods_id != id)
      uni.setStorageSync('goods_list', JSON.stringify(state.cart_list))
    },

    // 清空购物车
    clearCart(state) {
      state.cart_list = []
      uni.setStorageSync('goods_list', JSON.stringify(state.cart_list))
    },

    // 更新商品选中状态
    undateGoodsState(state, goods) {
      const findRes = state.cart_list.find(x => x.goods_id == goods.goods_id)
      if (!findRes) return
      findRes.is_checked = goods.is_checked
      uni.setStorageSync('goods_list', JSON.stringify(state.cart_list))
    },

    // 更新所有商品的选中状态
    updateAllChecked(state, newState) {
      // console.log(newState)
      state.cart_list.forEach(item => item.is_checked = newState)
      uni.setStorageSync('goods_list', JSON.stringify(state.cart_list))
    }



  },

  getters: {
    // 计算已勾选的商品数量
    checkedCount(state) {
      return state.cart_list.filter(x => x.is_checked).length
      // console.log(count)
    },
    // 购物车商品总数量
    total(state) {
      return state.cart_list.length
    },
    // 勾选商品总价格
    checkedGoodsAmount(state) {
      return state.cart_list.filter(item => item.is_checked)
        .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
        .toFixed(2)
    },

  },


}
