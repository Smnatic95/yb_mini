<template>
  <view class="container">
    <view class="goods_detail-page">

      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" circular :duration="1000">
        <swiper-item v-for="(item,i) in goodsInfo.image" :key='i'>
          <view class="pic">
            <image :src="`https://7n.oripetlife.com/${item}`"></image>
          </view>
        </swiper-item>
      </swiper>

      <view class="text-box">
        <view class="text-left">
          <view class="title">{{goodsInfo.name}}</view>
          <view class="intro">{{goodsInfo.introduction}}</view>
          <view class="price-col">
            <text class="icon">￥</text>
            <text class="price">{{goodsInfo.market_price}}</text>
            <image src="../../static/huiyuanjia.png"></image>
            <text class="price-dis">￥<text>{{goodsInfo.price}}</text></text>
          </view>
        </view>
        <view class="icon-right">
          <view class="icon">
            <image src="../../static/images/shoucang.png"></image>
            <!-- <image src="../../static/images/shoucang-active.png"></image> -->
          </view>
          <view class="icon">
            <image src="../../static/share.png"></image>
          </view>
        </view>
      </view>

      <view class="serve-box">
        <view class="serve-item" @click="showServePopup(1)">
          <view>
            <view class="title">服务说明</view>
            <view class="text">
              <view class="text-item">
                <view class="iconfont icon-duigou"></view>
                <text>7天无理由退换</text>
              </view>
              <view class="text-item">
                <view class="iconfont icon-duigou"></view>
                <text>急速退款</text>
              </view>
              <view class="text-item">
                <view class="iconfont icon-duigou"></view>
                <text>正品保证</text>
              </view>
            </view>
          </view>
          <uni-icons type="arrowright" size="12" color=""></uni-icons>
        </view>
        <view class="serve-item" @click="showServePopup(2)">
          <view>
            <view class="title">产品参数</view>
            <view class="text">
              <view class="text-item">
                <text>品牌</text>
              </view>
              <view class="text-item">
                <text>功效</text>
              </view>
            </view>
          </view>
          <uni-icons type="arrowright" size="12" color=""></uni-icons>
        </view>
      </view>

      <!-- <view class="comment">
        <view class="info">
          <view class="info-left">用户评价（3）</view>
          <view class="info-right" @click="gotoComments">
            查看全部
            <uni-icons type="arrowright" size="13" color="#C0C8D3"></uni-icons>
          </view>
        </view>
        <scroll-view class="comment-list" scroll-x="true" scroll-left="0">
          <view id="demo1" class="comment-item">
            <view class="user">
              <view class="avatar">
                <image src="../../static/avatar.png"></image>
              </view>
              <text>用户名</text>
            </view>
            <view class="comment-text">这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是
            </view>
          </view>
          <view id="demo1" class="comment-item">
            <view class="user">
              <view class="avatar">
                <image src="../../static/avatar.png"></image>
              </view>
              <text>用户名</text>
            </view>
            <view class="comment-text">这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是
            </view>
          </view>
        </scroll-view>
      </view> -->

      <view class="details">
        <view class="title">—— 商品详情 ——</view>
        <view class="pics" v-for="(item,i) in goodsInfo.de_image" :key='i'>
          <image v-if="item!==null" :src="`https://7n.oripetlife.com/${item}`" mode="widthFix"></image>
        </view>
      </view>

      <!-- 售空 -->
      <view class="sale-out" v-if="goods_stock==0">已售空~</view>

      <view class="goodsnav">
        <view class="kefu">
          <button open-type="contact" @contact="handleContact">
            <view class="iconfont icon-kefu1"></view>
            <view class="text">客服</view>
          </button>
        </view>
        <view class="goods-nav">
          <view class="cart" @click="gotoCart">
            <view class="iconfont icon-shoppingcart"></view>
            <view class="text">购物袋</view>
          </view>
          <view class="btns">
            <!-- <block > -->
            <button class='btn1' @click="addToCartHandler">加入购物车</button>
            <button class='btn2' v-if="token">立即购买</button>
            <button class='btn2' v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">立即购买</button>
            <!-- </block> -->
            <!-- <block v-else>
              <button class='btn1'>加入购物车</button>
              <button class='btn2' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">立即购买</button>
            </block> -->
          </view>
        </view>
      </view>

      <uni-popup ref="popup1" type="bottom">
        <view class="popup-box">
          <view class="serve-intro">
            <view class="title">服务说明</view>
            <view class="item">
              <view class="left">
                <view class="iconfont icon-duigou"></view>
              </view>
              <view class="right">
                <view class="right1">7天无理由退换</view>
                <view class="right2">您在满足7天无理由退货申请的前提下，可向顾问申请退换货，请放心购买</view>
              </view>
            </view>
            <view class="item">
              <view class="left">
                <view class="iconfont icon-duigou"></view>
              </view>
              <view class="right">
                <view class="right1">快速退款</view>
                <view class="right2">用户发起退款，经审核后享受急速退款到账</view>
              </view>
            </view>
            <view class="item">
              <view class="left">
                <view class="iconfont icon-duigou"></view>
              </view>
              <view class="right">
                <view class="right1">正品保证</view>
                <view class="right2">100%正品保证，。。。。。。。</view>
              </view>

            </view>

          </view>
        </view>
      </uni-popup>

      <uni-popup ref="popup2" type="bottom">
        <view class="popup-box">
          <view class="parameter">
            <view class="title">产品参数</view>
            <view class="item">
              <view class="left">保质期</view>
              <view class="right">半年以上</view>
            </view>
            <view class="item">
              <view class="left">品牌</view>
              <view class="right">{{goodsInfo.brand}}</view>
            </view>
            <view class="item">
              <view class="left">生产厂家</view>
              <view class="right">{{goodsInfo.producer}}</view>
            </view>
            <view class="item">
              <view class="left">适用对象</view>
              <view class="right">{{goodsInfo.applicable_objects}}</view>
            </view>
            <view class="item">
              <view class="left">重量</view>
              <view class="right">{{goodsInfo.weight}}</view>
            </view>
          </view>
        </view>
      </uni-popup>

    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        goods_id: '',
        goods_stock: '',
        goods_img: '',
        goodsInfo: {},
      };
    },
    computed: {
      ...mapState('user', ['token']),
    },
    onLoad(option) {
      console.log(this.token)
      this.goods_id = option.id
      if (option.goods_stock == 0) {
        this.buttonGroup.forEach(item => {
          item.backgroundColor = '#ccc'
        })
      }
      this.goods_stock = option.goods_stock
      this.goods_img = option.goods_img

      this.getGoodsDetail()
    },
    methods: {
      ...mapMutations('cart', ['addToCart']),

      handleContact(e) {
        console.log(e)
      },

      // 商品详情
      async getGoodsDetail() {
        const {
          data: res
        } = await uni.$http.get('sku_detail/' + this.goods_id + '/')
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        this.goodsInfo = res.lists[0]
        console.log(this.goodsInfo)
      },

      // 服务说明 弹出层
      showServePopup(type) {
        if (type === 1) {
          this.$refs.popup1.open('top')
        } else {
          this.$refs.popup2.open('top')
        }
      },

      // 跳转到全部评价页面
      gotoComments() {
        let goods_id = 2
        uni.navigateTo({
          url: '/subpkg/comments_list/comments_list?id=' + goods_id
        })
      },
      gotoCart() {
        uni.switchTab({
          url: '/pages/cart/cart'
        })
      },



      // 加购
      addToCartHandler() {
        const goods = {
          goods_id: this.goods_id,
          goods_name: '原本成猫粮',
          goods_intro: '猫来了联名款',
          goods_img: 'https://7n.oripetlife.com/' + this.goods_img,
          goods_price: '179.00',
          goods_count: 1,
          is_checked: true,
        }
        this.addToCart(goods)
      },
    }
  }
</script>

<style lang="scss">
  @import '@/static/iconfont/iconfont.css';

  .container {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .goods_detail-page {
    background-color: #F6F6F6;
    padding-bottom: 50px;
  }

  swiper {
    width: 100%;
    height: 750rpx;
  }

  .pic {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F6F6F6;
    width: 750rpx;
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }

  .text-box {
    display: flex;
    justify-content: space-between;
    padding: 20px 14px 14px;
    background-color: #FFFFFF;

    .text-left {
      .title {
        padding-bottom: 2px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000104;
      }

      .intro {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #C0C8D3;
      }

      .price-col {
        .icon {
          font-size: 11px;
          font-weight: bold;
          color: #294D7C;
        }

        .price {
          font-size: 26px;
          font-family: DIN;
          font-weight: bold;
          color: #294D7C;
        }

        image {
          margin-left: 3px;
          width: 29px;
          height: 13px;
        }

        .price-dis {
          margin-left: 20rpx;
          font-size: 16rpx;
          font-family: DIN;
          font-weight: 500;
          color: #C0C8D3;

          text {
            font-size: 32rpx;
            text-decoration: line-through
          }
        }
      }
    }

    .icon-right {
      display: flex;
      justify-content: space-between;
      width: 110rpx;
      height: 40rpx;

      &::before {
        content: '';
      }

      .icon {
        width: 40rpx;
        height: 40rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .serve-box {
    height: 80px;
    margin: 10px 0;
    background-color: #FFFFFF;

    .serve-item {
      height: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 15px;
      padding-right: 10rpx;

      >view {
        display: flex;
        align-items: center;
      }

      .title {
        // margin-right: 20rpx;
        font-size: 28rpx;
        color: #b5b5b5;
      }

      .text {
        // flex: 1;
        display: flex;
        align-items: center;
        // width: 100%;

        .text-item {
          display: flex;
          align-items: center;
          // margin-right: 20rpx;
          margin-left: 20rpx;

          .iconfont {
            // margin-right: 5px;
            font-size: 28rpx;
            color: tomato;
          }

          text {
            padding-left: 6rpx;
            font-size: 28rpx;
            color: #777;
          }
        }
      }
    }

  }

  .comment {
    height: 284rpx;
    margin-top: 20rpx;
    background: #FFFFFF;

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 30rpx;

      .info-left {
        // height: 21px;
        font-size: 30rpx;
        font-weight: bold;
        color: #000104;
      }

      .info-right {
        font-size: 13px;
        font-weight: 500;
        color: #C0C8D3;

        .uni-icons {
          margin-left: 6rpx;
        }
      }
    }

    .comment-list {
      white-space: nowrap;
      width: 100%;
      margin-right: 30rpx;

      .comment-item {
        display: inline-block;
        width: 570rpx;
        height: 164rpx;
        margin-left: 30rpx;
        padding: 30rpx 20rpx 30rpx 30rpx;
        box-sizing: border-box;
        background: #F6F6F6;
        border-radius: 8rpx;

        .user {
          display: flex;
          align-items: center;

          .avatar {
            width: 30rpx;
            height: 30rpx;
            margin-right: 8rpx;
            border-radius: 50%;
            overflow: hidden;

            image {
              width: 30rpx;
              height: 30rpx;
            }
          }

          text {
            font-size: 24rpx;
            font-weight: bold;
            color: #000104;
          }
        }

        .comment-text {
          float: right;
          width: 482rpx;
          height: 70rpx;
          margin-top: 10rpx;
          font-size: 12px;
          font-weight: 500;
          color: #8F99A7;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          white-space: normal !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .comment-item:last-child {
        margin-right: 30rpx;
      }
    }

  }

  .details {
    margin-top: 20rpx;

    .title {
      padding: 26rpx 0;
      // margin-bottom: 10px;
      text-align: center;
      font-size: 24rpx;
      font-weight: 500;
      color: #8F99A7;

      background-color: #FFFFFF;
    }

    .pics {
      width: 100%;

      image {
        width: 100%;
      }
    }
  }

  // 售空
  .sale-out {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
    background-color: #777;
    opacity: 0.9;
  }

  // 商品导航
  .goodsnav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FFFFFF;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    .goods-nav {
      position: fixed;
      left: 50px;
      right: 0;
      bottom: 0;
      bottom: constant(safe-area-inset-bottom);
      bottom: env(safe-area-inset-bottom);
      display: flex;
      align-items: center;
      height: 50px;
      font-size: 12px;
      color: #646566;
      background-color: #FFFFFF;

      .cart {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50px;
        padding-top: 2px;
        padding-left: 8px;

        .iconfont {
          margin-bottom: 2px;
        }
      }

      .btns {
        display: flex;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;

        button {
          width: 50%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: #FFFFFF;
          border-radius: 0;

          &::after {
            border: 0;
          }
        }

        .btn1 {
          background-color: #294D7C;
          border-radius: 20px 0 0 20px;
        }

        .btn2 {
          background-color: #ffa424;
          border-radius: 0 20px 20px 0;
        }
      }
    }
  }

  .kefu {
    position: fixed;
    bottom: 0;
    left: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    height: 50px;
    width: 50px;
    background-color: #FFFFFF;
    box-sizing: border-box;

    button {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 0;
      padding-left: 10px;
      padding-top: 5px;
      font-size: 12px;
      color: #646566;
      background-color: #FFFFFF;
      border-radius: 0;

      &::after {
        border: 0;
      }

      .icon-kefu1 {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 22px;

        &::before {
          display: flex;
          align-items: center;
          height: 16px;
          // margin-top: -200px !important;
        }
      }

      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 16px;
      }
    }
  }

  .uni-goods-nav {
    position: fixed;
    left: 50px;
    right: 0;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
  }

  // 服务说明 弹出层
  .popup-box {
    height: 500px;
    border-radius: 10px;
    background-color: #FFFFFF;

    .title {
      text-align: center;
      line-height: 50px;
      border-bottom: 1px solid #f4f4f4;
    }

    // 服务说明
    .serve-intro {
      padding: 0 20px;

      .item {
        display: flex;
        margin-top: 20px;

        .left {
          margin-top: 2px;
          margin-right: 5px;
        }

        .right {
          .right1 {
            color: #444;
            font-size: 28rpx;
          }

          .right2 {
            margin-top: 5px;
            color: #666;
            font-size: 24rpx;
          }
        }
      }

      .iconfont {
        color: tomato;
      }
    }

    // 产品参数
    .parameter {
      padding: 10px 10px 40px;

      .item {
        display: flex;
        align-items: center;
        // margin-bottom: 20px;
        // margin: 10px 0 20px;
        margin-top: 50px;
        font-size: 16px;

        .left {
          width: 20%;
          margin-right: 20px;
          color: #b5b5b5;
        }

        .right {
          color: #444;
        }
      }
    }
  }
</style>
