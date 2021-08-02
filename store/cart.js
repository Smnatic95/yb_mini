export default {
  namespaced: true,

  state: () => ({
    cart_list: JSON.parse(uni.getStorageSync('goods_list') || "[]"),
    gift_list: [], // 赠品列表
    is_vip: JSON.parse(uni.getStorageSync('userInfo') || "{}").vip_active || false,
    couponsList: JSON.parse(uni.getStorageSync('couponsList') || "[]"),
  }),

  mutations: {
    // 加入购物车
    addToCart(state, goods) {
      // console.log(goods.goods_id)
      const findRes = state.cart_list.find(item => item.goods_id == goods.goods_id)
      if (!findRes) {
        state.cart_list.unshift(goods)
      } else {
        findRes.goods_count++
        findRes.is_checked = true
      }
      uni.setStorageSync('goods_list', JSON.stringify(state.cart_list))
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
      state.cart_list.forEach(item => item.is_checked = newState)
      uni.setStorageSync('goods_list', JSON.stringify(state.cart_list))
    },

    // 更新用户优惠券
    updateCouponsList(state, list) {
      // console.log(list)
      state.couponsList = list
      uni.setStorageSync('couponsList', JSON.stringify(state.couponsList))
    },

    // 更新赠品列表
    updateGiftList(state, list) {
      state.gift_list = list
    },

    // 添加赠品
    addGift(state) {
      state.cart_list.forEach(item1 => {
        if ((item1.goods_id == 10 || item1.goods_id == 11 | item1.goods_id == 77 || item1.goods_id == 32 || item1
            .goods_id == 33 || item1.goods_id == 34) && item1.is_checked) {

          if (item1.goods_id == 10 || item1.goods_id == 32) {
            state.gift_list.forEach(item2 => {
              if (item2.id == 306) {
                let count = state.cart_list.filter(item3 => (item3.goods_id == 10 || item3.goods_id == 32) &&
                    item3.is_checked)
                  .reduce((total, item) => total += (item.goods_id == 10 ? item.goods_count : item.goods_count *
                    4), 0)

                const findRes = state.cart_list.find(item => item.goods_id == 306)
                if (!findRes) {
                  state.cart_list.push({
                    goods_id: item2.id,
                    goods_name: item2.name,
                    price: item2.price,
                    market_price: item2.market_price,
                    goods_img: '"https://7n.oripetlife.com/' + item2.image,
                    goods_count: count,
                    weight:item2.weight,
                    is_checked: true,
                  })
                }
              }
            })
          } else if (item1.goods_id == 11 || item1.goods_id == 33) {
            state.gift_list.forEach(item2 => {
              if (item2.id == 310) {
                let count = state.cart_list.filter(item3 => (item3.goods_id == 11 || item3.goods_id == 33) &&
                    item3.is_checked)
                  .reduce((total, item) => total += (item.goods_id == 11 ? item.goods_count : item.goods_count *
                    4), 0)

                const findRes = state.cart_list.find(item => item.goods_id == 310)
                if (!findRes) {
                  state.cart_list.push({
                    goods_id: item2.id,
                    goods_name: item2.name,
                    price: item2.price,
                    market_price: item2.market_price,
                    goods_img: '"https://7n.oripetlife.com/' + item2.image,
                    goods_count: count,
                    weight:item2.weight,
                    is_checked: true,
                  })
                }
              }
            })
          } else {
            state.gift_list.forEach(item2 => {
              if (item2.id == 303) {
                let count = state.cart_list.filter(item3 => (item3.goods_id == 77 || item3.goods_id == 34) &&
                    item3.is_checked)
                  .reduce((total, item) => total += (item.goods_id == 77 ? item.goods_count : item.goods_count *
                    4), 0)

                const findRes = state.cart_list.find(item => item.goods_id == 303)
                if (!findRes) {
                  state.cart_list.push({
                    goods_id: item2.id,
                    goods_name: item2.name,
                    price: item2.price,
                    market_price: item2.market_price,
                    goods_img: '"https://7n.oripetlife.com/' + item2.image,
                    goods_count: count,
                    weight:item2.weight,
                    is_checked: true,
                  })
                }
              }
            })
          }

          // 伴侣
          state.gift_list.forEach(item2 => {
            if (item2.id == 305) {
              let count = state.cart_list.filter(item3 => (item3.goods_id == 10 || item3.goods_id == 11 | item3
                  .goods_id == 77 || item3.goods_id == 32 || item3
                  .goods_id == 33 || item3.goods_id ==
                  34) && item3.is_checked)
                .reduce((total, item) => total += ((item.goods_id == 11 || item.goods_id == 10 || item
                    .goods_id == 77) ? item.goods_count : item.goods_count *
                  4), 0)

              const findRes = state.cart_list.find(item => item.goods_id == 305)
              if (!findRes) {
                state.cart_list.push({
                  goods_id: item2.id,
                  goods_name: item2.name,
                  price: item2.price,
                  market_price: item2.market_price,
                  goods_img: '"https://7n.oripetlife.com/' + item2.image,
                  goods_count: count,
                  weight:item2.weight,
                  is_checked: true,
                })
              }
            }
          })
        }
      })
    },
    // 删除赠品
    deleteGift(state) {
      state.cart_list = state.cart_list.filter(x => !(x.goods_id == 306 || x.goods_id == 310 || x.goods_id == 303 ||
        x.goods_id == 305))
    },

    // 更新vip状态
    updateVip(state, status) {
      state.is_vip = status
      uni.setStorageSync('is_vip', JSON.stringify(state.is_vip))
    }
  },

  getters: {
    // 计算已勾选的商品数量
    checkedCount(state) {
      return state.cart_list.filter(x => x.is_checked).length
    },
    // 购物车商品总数量
    total(state) {
      return state.cart_list.length
    },
    // 勾选商品总价格
    checkedGoodsAmount(state) {
      return state.cart_list.filter(item => item.is_checked)
        .reduce((total, item) => total += item.goods_count * item.price, 0)
        .toFixed(2)
    },
    checkedGoodsAmount_vip(state) {
      return state.cart_list.filter(item => item.is_checked)
        .reduce((total, item) => total += item.goods_count * item.market_price, 0)
        .toFixed(2)
    },


  },


}
