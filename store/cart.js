export default {
  namespaced: true,

  state: () => ({
    cart_list: JSON.parse(uni.getStorageSync('goods_list') || "[]"),
    gift_list: [], // 赠品列表
    is_vip: JSON.parse(uni.getStorageSync('userInfo') || "{}").vip_active || false,
    couponsList: JSON.parse(uni.getStorageSync('couponsList') || "[]"),
    giftsTogoods: [
      {
        goods_id: 10,
        gifts: [{
          id: 306,
          count: 1
        }, {
          id: 320,
          count: 2
        }]
      },

      {
        goods_id: 11,
        gifts: [{
          id: 310,
          count: 1
        }, {
          id: 320,
          count: 2
        }]
      },

      {
        goods_id: 77,
        gifts: [{
          id: 303,
          count: 1
        }, {
          id: 320,
          count: 2
        }]
      },

      {
        goods_id: 32,
        gifts: [{
          id: 306,
          count: 4
        }, {
          id: 320,
          count: 8
        }]
      },

      {
        goods_id: 33,
        gifts: [{
          id: 310,
          count: 4
        }, {
          id: 320,
          count: 8
        }]
      },

      {
        goods_id: 34,
        gifts: [{
          id: 303,
          count: 4
        }, {
          id: 320,
          count: 8
        }]
      }
    ]
  }),

  mutations: {
    // 加入购物车
    addToCart(state, goods) {
      goods.goods_count = goods.goods_count || 1;
      const findRes = state.cart_list.find(item => item.goods_id == goods.goods_id)
      if (!findRes) {
        state.cart_list.unshift(goods)
      } else {
        findRes.goods_count += goods.goods_count;
        findRes.is_checked = true;
        console.log('购物车中id为' + findRes.goods_id + '的商品数量更改为' + findRes.goods_count);
      }
      uni.setStorageSync('goods_list', JSON.stringify(state.cart_list));
    },

    // 更新加购数量
    updateGoodsCount(state, goods) {
      const findRes = state.cart_list.find(x => x.goods_id == goods.goods_id)
      if (!findRes) return
      findRes.goods_count = goods.goods_count;
      console.log('购物车中id为' + findRes.goods_id + '的商品数量更新为' + findRes.goods_count);
      uni.setStorageSync('goods_list', JSON.stringify(state.cart_list))
    },

    // 根据id删除购物车商品
    removeGoodsById(state, id) {
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
      //先清除赠品
      state.cart_list = state.cart_list.filter(x =>{
        return !state.gift_list.some( (gift)=>{
           return gift.id==x.goods_id;
        } )
      })
      
      let giftsTogoods = state.giftsTogoods;
      //遍历商品
      state.cart_list.forEach(item1 => {

        if (item1.is_checked) {

          giftsTogoods.forEach((item2) => {
            //如果有赠品
            if (item2.goods_id == item1.goods_id) {
              //遍历赠品列表
              item2.gifts.forEach((item3) => {
                let findGift = state.gift_list.find((gifts) => gifts.id == item3.id),
                  giftsIngoods = state.cart_list.find((goods) => goods.goods_id == item3.id);
                console.log(item1.goods_name, '赠送商品:', findGift.name, '赠送数量：', item3.count * item1
                  .goods_count);
                if (!giftsIngoods) {
                  state.cart_list.push({
                    goods_id: findGift.id,
                    goods_name: findGift.name,
                    price: findGift.price,
                    market_price: findGift.market_price,
                    goods_img: uni.$baseUrl1 + findGift.image,
                    goods_count: item3.count * item1.goods_count,
                    weight: findGift.weight,
                    is_checked: true
                  })
                } else {
                  giftsIngoods.goods_count += (item3.count * item1.goods_count)
                }
              })
            }
          })

        }

      })
    },
    
    // 删除赠品
    deleteGift(state) {
      console.log('删除赠品');
      state.cart_list = state.cart_list.filter(x =>{
        return !state.gift_list.some( (gift)=>{
           return gift.id==x.goods_id;
        } )
      })
    },

    // 更新vip状态
    updateVip(state, status) {
      state.is_vip = status
      uni.setStorageSync('is_vip', JSON.stringify(state.is_vip))
    },
  
    reloadCart(state){
      
      let stateNow = {
        cart_list: JSON.parse(uni.getStorageSync('goods_list') || "[]"),
        is_vip: JSON.parse(uni.getStorageSync('userInfo') || "{}").vip_active || false,
        couponsList: JSON.parse(uni.getStorageSync('couponsList') || "[]")
      }
      
      Object.keys(stateNow).forEach((key) => {
        state[key] = stateNow[key];
      })

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
    }
  }

}
