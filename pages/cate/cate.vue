<template>
  <view class="cate-page">

    <view class="search-box">
      <view class="search-bar" @click="gotoSearch">
        <icon type="search" size="20" />
        <view>搜索商品</view>
      </view>
    </view>

    <view class="scroll-box">

      <scroll-view class="scroll-left" :scroll-top="scrollTop" scroll-y>
        <view :class="['scroll-view-item',i===active?'active':'']" v-for="(item,i) in scrollList" :key='i'
          @click="activeChanged(item,i)">{{item.title}}</view>
      </scroll-view>

      <scroll-view class="scroll-right" :scroll-top="scrollTop" scroll-y>
        <view class="scroll-view-item" v-for="item in goodsList" :key='item.id'>
          <view class="goods-pic" @click="gotoGoodsDetail(item)">
            <image :src="'https://7n.oripetlife.com/'+item.img"></image>
          </view>
          <view class="goods-info">
            <view class="goods-title" @click="gotoGoodsDetail(item)">{{item.name}}</view>
            <view class="goods-price">
              <view class="price" @click="gotoGoodsDetail(item)">
                <image class="icon" src="https://7n.oripetlife.com/huiyuanjia.png"></image>
                <text style="font-size: 12px;"></text>{{item.market_price}}

                <text class="price-dis">￥<text>{{item.price}}</text></text>

              </view>
              <view class="cart" v-if="item.stock>0" @click="addCart(item)">
                <uni-icons type="cart" size="14" color="#fff"></uni-icons>
              </view>
              <view class="out" v-else>售空</view>
            </view>
          </view>

        </view>

        <view style="height: 100px;"></view>
      </scroll-view>
    </view>

    <!-- 结算按钮 -->
    <view class="btns-box">
      <view class="cart" @click="showPopup">
        <image src="/static/images/cart.png" mode="widthFix"></image>
      </view>
      <view class="price" @click="showPopup">￥{{is_vip?checkedGoodsAmount_vip:checkedGoodsAmount}}</view>
      <view class="settle" v-if="token" @click="gotoSettle">去结算({{checkedCount}})</view>
      <button class="settle" v-else open-type="getPhoneNumber" @getphonenumber="getPhone">去结算({{checkedCount}})</button>
    </view>

    <!-- 购物袋弹出层 -->
    <uni-popup ref="popup" type="bottom">
      <scroll-view scroll-y="true">
        <view class="top">
          <view class="title">已选商品</view>
          <view class="delete" @click="clearCartHandler">
            <uni-icons type="trash" size="15" color=""></uni-icons>
            清空
          </view>
        </view>
        <block v-for="(item,i) in cart_list" :key='i'>
          <goods-item :goods='item' :is_vip="is_vip" v-if="item.is_checked" :showRadio="false" showClearBtn>
          </goods-item>
        </block>
        <view style="height: 100px;"></view>
      </scroll-view>
    </uni-popup>

  </view>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations,
    createNamespacedHelpers
  } from 'vuex'
  const {
    mapState: mapStateCart
  } = createNamespacedHelpers('cart')
  const {
    mapState: mapStateHome
  } = createNamespacedHelpers('home')
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
        // scrollList: ['热门推荐', '犬粮', '猫粮', '猫砂', '零食', '营养保健', '其它'],
        active: 0,
        cartList: [],
        cartPopup: false,

        goodsListAll: [],
        goodsList: [],
        is_vip: '',
      };
    },
    onShow() {
      this.is_vip = JSON.parse(uni.getStorageSync('userInfo') || "{}").vip_active || false
    },

    computed: {
      ...mapStateHome(['scrollList']),
      ...mapStateCart(['cart_list']),
      ...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount', 'checkedGoodsAmount_vip']),
    },

    onLoad() {
      this.cartList = JSON.parse(uni.getStorageSync('goods_list') || "[]")
      // console.log(this.cartList)
      this.getGoodsList()
    },

    methods: {
      ...mapMutations('cart', ['addToCart', 'clearCart']),

      async getGoodsList() {
        const {
          data: res
        } = await uni.$http.get('user_skus/')
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        this.goodsListAll = res.lists

        // 四袋装
        this.goodsListAll.forEach(item => {
          if (item.id == 32 || item.id == 33 || item.id == 34) {
            item.market_price = (Number(item.market_price) * 4).toFixed(2)
            item.price = (Number(item.price) * 4).toFixed(2)
          }
        })

        // 售空
        // const arr = [...this.goodsListAll.filter(x => x.type == item.type)]
        const arr1 = this.goodsListAll.filter(x => x.stock > 0)
        const arr2 = this.goodsListAll.filter(x => x.stock == 0)

        this.goodsList = [...arr1, ...arr2]
      },

      activeChanged(item, i) {
        this.active = i
        if (!item.type && item.type != 0) return this.getGoodsList()
        const arr = [...this.goodsListAll.filter(x => x.type == item.type)]
        const arr1 = arr.filter(x => x.stock > 0)
        const arr2 = arr.filter(x => x.stock == 0)
        this.goodsList = [...arr1, ...arr2]
      },

      showPopup() {
        if (!this.cartPopup) {
          this.$refs.popup.open('bottom')
          this.cartPopup = true
        } else {
          this.$refs.popup.close('bottom')
          this.cartPopup = false
        }
      },

      // 点击加入购物车
      addCart(item) {
        console.log(item)
        const goods = {
          goods_id: item.id,
          goods_name: item.name,
          goods_intro: item.intro,
          goods_img: 'https://7n.oripetlife.com/' + item.img,
          // goods_price: item.price,
          market_price: item.market_price,
          price: item.price,
          goods_count: 1,
          weight: item.weight,
          is_checked: true,
        }
        this.addToCart(goods)
        uni.$showMsg("商品添加成功~")
      },
      clearCartHandler() {
        this.clearCart()
      },

      // 跳转商品详情页面
      gotoGoodsDetail(item) {
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?id=${item.id}&goods_stock=${item.stock}&weight=${item.weight}`,
        })
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
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
  .search-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #FFFFFF;
    z-index: 999;

    .search-bar {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
      margin: 15px;
      background: #F6F6F6;
      border-radius: 20px;

      view {
        // width: 52px;
        // height: 18px;
        margin-left: 5px;
        font-size: 13px;
        // font-family: PingFang SC;
        font-weight: 500;
        color: #C0C8D3 !important;
        z-index: 999;
      }
    }

  }

  .scroll-box {
    display: flex;
    // border-top: 1px solid #F8F8F8;

    .scroll-left,
    .scroll-right {
      height: 100vh;
      padding-top: 65px;
      box-sizing: border-box;
    }

    .scroll-left {
      width: 130px;
      background-color: #F6F6F6;
      border-top: 1px solid #F6F6F6;

      .active {
        position: relative;
        font-weight: 500;
        color: #294D7C;
        background-color: #FFFFFF;

        &::before {
          content: '';
          position: absolute;
          left: -3px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 20px;
          background-color: #294D7C;
          border-radius: 3px;
        }
      }

      .scroll-view-item {
        line-height: 50px;
        text-align: center;
      }
    }

    .scroll-right {
      .scroll-view-item {
        display: flex;
        padding: 10px;

        .goods-pic {
          width: 75px;
          height: 75px;
          margin-right: 10px;
          background-color: #F6F6F6;
          border-radius: 10px;
          overflow: hidden;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .goods-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .goods-title {
            font-size: 15px;
            // font-weight: 500;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .goods-price {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
            font-size: 18px;
            color: #294D7C;

            .cart {
              // float: right;
              display: inline-block;
              width: 42rpx;
              height: 42rpx;
              line-height: 42rpx;
              text-align: center;
              font-weight: 400;
              margin-right: 10rpx;
              background-color: #294D7C;
              border-radius: 50%;
              overflow: hidden;
            }

            .out {
              float: right;
              display: inline-block;
              text-align: center;
              font-size: 12px;
              color: #FFFFFF;
              margin-right: 10rpx;
              margin-top: 2px;
              padding: 5rpx 10rpx;
              background-color: tomato;
              border-radius: 21rpx;
            }

            .icon {
              // margin-top: 20px;
              // margin-left: 5rpx;
              margin-right: 2px;
              width: 46rpx;
              height: 28rpx;
            }

            .price-dis {
              margin-left: 10rpx;
              font-size: 12px;
              font-family: DIN;
              font-weight: 500;
              color: #C0C8D3;

              text {
                text-decoration: line-through
              }
            }
          }
        }

      }
    }

  }

  // 结算按钮
  .btns-box {
    position: fixed;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    width: 680rpx;
    height: 50px;
    background-color: #282828;
    border-radius: 25px;
    // overflow: hidden;
    box-sizing: border-box;
    z-index: 999;

    .cart {
      position: absolute;
      left: 20px;
      bottom: 10px;
      width: 60px;

      image {
        width: 100%;
      }
    }

    .price {
      position: absolute;
      left: 100px;
      color: #FFFFFF;
      line-height: 50px;
      font-weight: bold;
      font-size: 18px;
    }

    .settle {
      float: right;
      width: 120px;
      height: 100%;
      line-height: 50px;
      text-align: center;
      color: #FFFFFF;
      background-color: #294D7C;
      border-radius: 0 25px 25px 0;

      &::after {
        border: 0;
      }
    }
  }

  // 弹出层
  uni-popup {
    scroll-view {
      height: 700rpx;
      // padding-top: 40px;

      .top {
        // position: fixed;
        // top: 0;
        // left: 0;
        // right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 15px 15px;
        z-index: 999;

        .title {
          font-size: 15px;
          font-weight: bold;
        }

        .delete {
          font-size: 14px;
          color: #a5a5a5;

          uni-icons {
            padding-right: 5px;
          }
        }
      }
    }
  }

  .uni-popup__wrapper-box {
    background-color: #FFFFFF;
  }
</style>
