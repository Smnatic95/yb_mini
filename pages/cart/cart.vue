<template>
  <view class="page">

    <view class="info-box">
      <view class="item">
        <uni-icons type="checkbox" size="14" color=""></uni-icons>100%正品保证
      </view>
      <view class="item">
        <uni-icons type="checkbox" size="14" color=""></uni-icons>所有商品精挑细选
      </view>
      <view class="item">
        <uni-icons type="checkbox" size="14" color=""></uni-icons>售后无忧
      </view>
    </view>

    <view class="top">
      <view class="left">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="top-text">购物袋</text>
      </view>
      <view class="right" @click="clearCart">
        <uni-icons type="trash" size="15" color=""></uni-icons>
        <text class="top-text">清空</text>
      </view>
    </view>

    <view class="cart-pic" v-if="cart_list.length<=0">
      <image src="https://7n.oripetlife.com/cart1.png" mode="heightFix"></image>
    </view>

    <view class="goods-list" v-else>
      <uni-swipe-action>
        <view class="mb" v-for="(item,i) in cart_list" :key='i'>
          <uni-swipe-action-item :right-options="options1" @click="swipeActionClickhandler(item)">
            <!-- 商品项组件 -->
            <goods-item :goods='item' :is_vip='is_vip' @num-change='numberChangeHandler'
              @radio-click='radioClickHandler'></goods-item>
          </uni-swipe-action-item>
        </view>
      </uni-swipe-action>
    </view>

    <!-- 结算按钮 -->
    <view class="settle-box">
      <view class="left">
        <radio :checked='isFullChecked' @click="allCheckedClick" color="tomato" style="transform:scale(0.7)" />
        <text>全选</text>
      </view>
      <view class="right">
        <view class="total-box">
          <view class="total-price">
            合计：
            <text>￥</text>
            <text class="price">{{is_vip?checkedGoodsAmount_vip:checkedGoodsAmount}}</text>
          </view>
          <!-- <view class="postage">不含运费</view> -->
        </view>
        <button type="default" v-if="token" @click="gotoSettle">结算({{checkedCount}})</button>
        <button type="default" v-else open-type="getPhoneNumber"
          @getphonenumber="getPhone">结算({{checkedCount}})</button>
      </view>
    </view>

    <!-- 猜你喜欢-->
    <view class="hot-recommend">
      <view class="title">猜你喜欢</view>
      <home-goodsitem :goodsList="hotList"></home-goodsitem>
    </view>

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters,
    createNamespacedHelpers
  } from 'vuex'
  const {
    mapState: mapStateUser,
    mapMutations: mapMutationsUser
  } = createNamespacedHelpers("user")
  const {
    mapState: mapStateCart,
    mapMutations: mapMutationsCart
  } = createNamespacedHelpers("cart")

  import badgeMix from '@/mixins/tabbar-badge.js'
  import shareMix from '@/mixins/share-app.js'
  import phoneMix from '@/mixins/get-phone.js'

  export default {
    mixins: [badgeMix, shareMix, phoneMix], // 导入公共js
    data() {
      return {
        options1: [{
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }],
        hotList: [],
        is_vip: ''
      }
    },
    computed: {
      ...mapStateCart(['cart_list']),
      ...mapStateUser(['token']),
      ...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount', 'checkedGoodsAmount_vip']),

      // 全选按钮选中状态
      isFullChecked() {
        return (this.total === this.checkedCount) && (this.total !== 0)
      },
    },
    onLoad() {
      this.getHotList()
    },
    onShow() {
      this.is_vip = JSON.parse(uni.getStorageSync('userInfo') || "{}").vip_active || false
      // console.log(this.is_vip)
    },

    methods: {
      ...mapMutationsCart(['addToCart', 'updateGoodsCount', 'removeGoodsById', 'undateGoodsState',
        'updateAllChecked', 'clearCart',
      ]),
      ...mapMutationsUser(['undateToken', 'updateUserInfo']),

      // 热门榜单
      async getHotList() {
        const {
          data: res
        } = await uni.$http.get('user_hots_skus/')
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)

        // 售空
        const arr1 = res.lists.filter(x => x.stock > 0)
        const arr2 = res.lists.filter(x => x.stock == 0)
        this.hotList = [...arr1, ...arr2]

        // 四袋装
        this.hotList.forEach(item => {
          if (item.id == 32 || item.id == 33 || item.id == 34) {
            item.market_price = (Number(item.market_price) * 4).toFixed(2)
            item.price = (Number(item.price) * 4).toFixed(2)
          }
        })
      },

      // 点击删除购物车商品
      swipeActionClickhandler(goods) {
        // console.log(goods.goods_id)
        this.removeGoodsById(goods.goods_id)
      },

      // 跳转商品详情页面
      gotoGoodsDetail() {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail'
        })
      },

      // 切换数量
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },

      // 切换按钮按钮选中状态
      radioClickHandler(e) {
        // console.log(e)
        this.undateGoodsState(e)
      },

      // 更新全选按钮的选中状态
      allCheckedClick() {
        this.updateAllChecked(!this.isFullChecked)
      },

      // 结算
      gotoSettle() {
        if (this.checkedCount <= 0) return
        uni.navigateTo({
          url: '/pages/settle/settle'
        })
      },

      getPhone(e) {
        this.getPhoneNumber(e)
        setTimeout(() => {
          console.log(this.token)
          if (this.token) {
            this.gotoSettle()
          }
        }, 1500)
      }




    }

  }
</script>

<style lang="scss">
  .info-box {
    display: flex;
    justify-content: space-around;
    padding: 12px 0;
    font-size: 12px;
    color: #8c8c8c;

    uni-icons {
      padding-right: 5px;
    }
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px 10px 5px;
    font-size: 16px;
    background-color: #FFFFFF;

    .left {
      uni-icons {
        padding: 0 10px;
      }

      .top-text {
        font-size: 16px;
      }
    }

    .right {
      font-size: 15px;
      color: #8c8c8c;

      uni-icons {
        padding: 0 3px;
      }
    }
  }

  .cart-pic {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 750rpx;

    image {
      height: 60%;

    }
  }

  // 商品列表
  .goods-list {
    padding: 20rpx;

    .mb {
      margin-bottom: 20rpx;
    }


  }

  // 结算
  .settle-box {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    padding: 0 20rpx;
    background-color: #FFFFFF;
    box-sizing: border-box;

    .left {
      font-size: 24rpx;
    }

    .right {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      box-sizing: border-box;

      .total-box {
        display: flex;
        // text-align: right;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-end;
        margin: 20rpx;

        .total-price {
          text {
            font-size: 24rpx;
            color: tomato;
            font-weight: 700;
          }

          .price {
            font-size: 30rpx;
            color: tomato;
            font-weight: 700;
          }
        }

        .postage {
          color: #C0C8D3;
        }
      }

      button {
        height: 40px;
        line-height: 40px;
        background-color: tomato;
        color: #FFFFFF;
        font-size: 30rpx;
        border-radius: 20px;
        overflow: hidden;
        padding: 0 60rpx;

        &::after {
          border: unset;
        }
      }
    }
  }

  // 猜你喜欢
  .hot-recommend {
    margin-top: -10px;
    padding-bottom: 50px;
    background-color: #FFFFFF;

    .title {
      text-align: center;
      padding: 12px;
      font-size: 14px;
    }
  }
</style>
