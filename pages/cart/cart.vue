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
        <text class="top-text title">购物袋</text>
        <text class="count">({{cart_list.length}})</text>
      </view>
      <!-- <view class="right" @click="clearCart">
        <uni-icons type="trash" size="15" color=""></uni-icons>
        <text class="top-text">清空</text>
      </view> -->
      <view class="right manageCart" :class="{ active:isManange }" @click="manageCart">
        <view class="top-text">管理</view>
        <view class="icon_delete" v-if="isManange">X</view>
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

    <!-- 底部栏 -->
    <view class="settle-box">
      <view class="left">
        
        <radio-group name="allcheck" @click="allCheckedClick" v-if="cart_list.length>0">
          <label class="radio">
            <radio :checked='isFullChecked' color="tomato" style="transform:scale(0.7)" />
            <text>全选</text>
          </label>
        </radio-group>
        
        <radio-group name="allcheck" @click="allCheckedClick1" v-else>
          <label class="radio">
            <radio :checked='isFullChecked1' color="tomato" style="transform:scale(0.7)" />
            <text>全选</text>
          </label>
        </radio-group>
        
      </view>
      <!--结算-->
      <view class="right" v-if="!isManange">
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
      <!--删除-->
      <view class="right onManage" v-else>
        <button type="default" @click="deleteGoods">删除</button>
      </view>

    </view>

    <!-- 猜你喜欢-->
    <view class="hot-recommend">
      <view class="title">猜你喜欢</view>
      <home-goodsitem :goodsList="hotList"></home-goodsitem>
    </view>

    <uni-popup ref="deletedialog" type="dialog">
      <uni-popup-dialog cancelText="我再想想" confirmText="删除" :content="deeteToa" @confirm="deleteconfirm" title="提示">
      </uni-popup-dialog>
    </uni-popup>

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
        is_vip: '',
        isManange: false,
        isFullChecked1: false
      }
    },
    computed: {
      ...mapStateCart(['cart_list']),
      ...mapStateUser(['token']),
      ...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount', 'checkedGoodsAmount_vip']),
      // 全选按钮选中状态
      isFullChecked() {
        return this.total === this.checkedCount && this.total > 0;
      },
      deeteToa() {
        return `确认将这${this.checkedCount}个宝贝删除？`
      }
    },
    onLoad() {
      this.getHotList();
    },
    onShow() {
      this.is_vip = JSON.parse(uni.getStorageSync('userInfo') || "{}").vip_active || false;
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

      allCheckedClick1() {
        this.isFullChecked1 = !this.isFullChecked1;
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
        this.updateAllChecked(!this.isFullChecked);
      },

      // 结算
      gotoSettle() {
        if (this.checkedCount <= 0) {
          return uni.$showMsg('您还没有选择宝贝哦！')
        }
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
      },
      manageCart() {
        this.isManange = !this.isManange;
      },
      deleteGoods() {
        let choosedGoods = this.cart_list.filter(item => item.is_checked);
        if (!choosedGoods.length) {
          return uni.$showMsg('您还没有选择宝贝哦！')
        } else {
          this.$refs.deletedialog.open();
        }
      },
      deleteconfirm() {
        this.$refs.deletedialog.close();
        let choosedGoods = this.cart_list.filter(item => item.is_checked);
        choosedGoods.forEach((item) => {
          this.removeGoodsById(item.goods_id);
        })
        uni.$showMsg('删除成功', 1000)
      }
    },
    watch:{
      isFullChecked(){
       this.isFullChecked1 = this.isFullChecked;
      }
    }

  }
</script>

<style lang="scss">
  
  label{
    display: flex;
    align-items: center;
  }
  
  .uni-popup__error {
    color: black !important;
  }

  .uni-dialog-button .uni-dialog-button-text {
    color: gray;
  }

  .uni-border-left .uni-dialog-button-text {
    color: #FE0741 !important;
  }


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
      display: flex;
      align-items: center;

      uni-icons {
        padding: 0 10px;
      }

      .top-text {
        height: 34rpx;
        font-size: 34rpx;
        line-height: 34rpx;
      }

      .count {
        font-size: 28rpx;
        height: 28rpx;
        line-height: 28rpx;
        margin-left: 5rpx;
      }

    }

    .right {
      font-size: 15px;
      color: #8c8c8c;


      &.manageCart {
        line-height: 50rpx;
        height: 50rpx;
        padding: 0 20rpx;
        border: 1px solid #fff;
        border-radius: 30rpx;
        font-size: 28rpx;
      }

      &.manageCart.active {
        color: #E84E0E;
        border: 1px solid #E0C6BA;
        display: flex;
        align-items: center;

        .top-text {
          font-weight: 600;
          margin-right: 6rpx;
        }

        .icon_delete {
          font-size: 24rpx;
          height: 24rpx;
          line-height: 24rpx;
        }

      }

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

      &.onManage {
        button {
          background: linear-gradient(to right, #FF0359, #FA1A04);
        }
      }

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
