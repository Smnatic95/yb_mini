<template>
  <view class="order-component">
    <view class="order-box" v-for="(item,index) in orderList" :key='item.order_id'>
      <!-- 订单号 -->
      <view class="order-info">
        <view class="id">订单编号：13213443145446</view>
        <view class="state">
          <!-- <text style="color: #FFA424;">未发货</text> -->
          <text style="color: #80C5CD;">已签收</text>
        </view>
      </view>
      <!-- 商品详情 -->
      <view class="goods">
        <view class="pic">
          <image src="/static/goods1.png" mode=""></image>
        </view>
        <view class="text">
          <view>
            <view class="title">原本猫砂礼盒装</view>
            <view class="intro">猫来了联名款</view>
          </view>
          <view class="price">
            <view class="price">￥<text>199.00</text></view>
            <text class="num">x 1</text>
          </view>
        </view>
      </view>

      <view class="goods">
        <view class="pic">
          <image src="/static/goods1.png" mode=""></image>
        </view>
        <view class="text">
          <view>
            <view class="title">原本猫砂礼盒装</view>
            <view class="intro">猫来了联名款</view>
          </view>
          <view class="price">
            <view class="price">￥<text>199.00</text></view>
            <text class="num">x 1</text>
          </view>
        </view>
      </view>

      <view class="btns-box">
        <button @click="gotoTrick">查看物流</button>
        <!-- <button>确认收货</button> -->
        <!-- <button @click="gotoMark">立即评价</button> -->
        <!-- <button @click="gotoCommentDetail">查看评价</button> -->
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    // props: {
    //   order: {
    //     type: Array,
    //     default: []
    //   }
    // },
    data() {
      return {
        orderList: []
      };
    },
    onLoad() {
      this.orderList = JSON.parse(uni.getStorageSync('orderList') || "[]")
      console.log(this.orderList)
    },
    methods: {
      gotoMark() {
        uni.navigateTo({
          url: '/subpkg/tomark/tomark'
        })
      },
      gotoCommentDetail() {
        uni.navigateTo({
          url: '/subpkg/comment_detail/comment_detail'
        })
      },
      gotoTrick() {
        uni.navigateTo({
          url: '/subpkg/track/track'
        })
      }
    }
  }
</script>

<style lang="scss">
  .order-component {
    padding: 20rpx 30rpx 20rpx;

    .order-box {
      padding: 0 30rpx;
      margin-bottom: 20rpx;
      background-color: #FFFFFF;
      border-radius: 8rpx;

      .order-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24rpx;

        .id {
          font-size: 30rpx;
          font-weight: 500;
          color: #999999;
        }

        .state {
          font-size: 32rpx;
          font-weight: 500;
        }
      }
    }

    .goods {
      display: flex;
      padding-bottom: 30rpx;

      .pic {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180rpx;
        height: 180rpx;
        margin-right: 30rpx;
        background: #F0F0F0;
        border-radius: 6px;
        overflow: hidden;

        image {
          width: 80%;
          height: 80%;
        }
      }

      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10rpx 0;

        .title {
          font-size: 32rpx;
          font-weight: bold;
          color: #000104;
        }

        .intro {
          font-size: 28rpx;
          font-weight: 500;
          color: #C0C8D3;
        }

        .price {
          .price {
            float: left;
            font-size: 24rpx;
            font-weight: 500;
            color: #C0C8D3;

            text {
              font-size: 36rpx;
            }

          }

          .num {
            float: right;
            // font-size: 24rpx;
            font-weight: 500;
            color: #C0C8D3;
          }
        }
      }
    }

    .btns-box {
      display: flex;
      justify-content: flex-end;
      border-top: 1px dashed #DFDFDF;

      button:first-child {
        color: #294D7C;
        border-color: #294D7C;
        background-color: #FFFFFF;
      }

      button {
        width: 180rpx;
        // height: 30px;
        background: #294D7C;
        // margin: 0;
        margin: 30rpx;
        margin-right: 0;
        border-radius: 8rpx;
        font-size: 28rpx;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }

</style>
