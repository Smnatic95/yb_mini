<template>
  <view class="balance-page">
    <view class="balance-top">
      <view class="title">余额</view>
      <view class="num">
        <image src="/static/images/price.png" mode=""></image>
        <text>500.00</text>
      </view>
    </view>

    <!-- 充值 -->
    <view class="balance-item" @click="gotoOrderDetail(1)">
      <view class="top">
        <view class="title">
          <view class="type">充值</view>
          <view class="time">2020.06.28 15:50</view>
          <view class="order">20210629100150000008407</view>
        </view>
        <view class="num">
          <text>+520</text>
        </view>
      </view>
    </view>

    <!-- 消费 -->
    <view class="balance-item">
      <view class="top" @click="gotoOrderDetail(2)">
        <view class="title">
          <view class="type">消费</view>
          <view class="time">2020.06.28 15:50</view>
          <view class="order">20210629100150000008407</view>
        </view>
        <view class="num sub">
          <text>-20</text>
        </view>
      </view>

      <view class="goods">
        <view class="goods-detail" v-if="isGoodsShow">
          <view class="goods-item">
            <view class="pic">
              <image src="/static/goods1.png" mode=""></image>
            </view>
            <view class="title">原本成年猫粮原本成年猫粮原本成年猫粮原本成年猫粮原本成年猫粮</view>
            <view class="price">￥199.00</view>
            <view class="num">x1</view>
          </view>
     
        </view>
        <view class="icon" @click='goodsChange'>
          <uni-icons v-if="isGoodsShow" type="arrowup" size="14" color="#c0c8d3"></uni-icons>
          <uni-icons v-else type="arrowdown" size="14" color="#c0c8d3"></uni-icons>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        isGoodsShow: false
      };
    },
    methods: {
      goodsChange() {
        this.isGoodsShow = !this.isGoodsShow
      },
      gotoOrderDetail(type) {
        uni.navigateTo({
          url: '/pages/order-detail/order-detail?type=' + type
        })
      }
    }
  }
</script>

<style lang="scss">
  .balance-page {
    background-color: #f6f6f6;
    min-height: 100vh;
  }

  .balance-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120rpx;
    padding: 0 30rpx;
    margin-bottom: 20rpx;
    background: #FFFFFF;

    .title {
      font-size: 30rpx;
      font-weight: bold;
      color: #000104;

      .time {
        font-size: 24r2px;
        font-weight: 500;
        color: #C0C8D3;
      }
    }

    .num {
      display: flex;
      align-items: flex-end;
      font-size: 44rpx;
      font-weight: bold;
      color: #E0C699;

      image {
        width: 14rpx;
        height: 20rpx;
        margin: 0 10rpx 18rpx 0;
      }
    }
  }

  .balance-item {
    display: flex;
    flex-direction: column;
    padding: 0 30rpx;
    margin-bottom: 10rpx;
    background: #FFFFFF;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // height: 120rpx;
      padding: 10px 0;

      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #000104;

        .time {
          font-size: 24rpx;
          font-weight: 500;
          color: #C0C8D3;
        }

        .order {
          font-size: 28rpx;
          font-weight: 500;
          color: #8F99A7;
        }
      }

      .num {
        display: flex;
        align-items: center;
        font-size: 32rpx;
        font-weight: bold;
        color: #E0C699;

        &.sub {
          color: #80C5CD;
        }
      }
    }

    .goods {
      .goods-detail {
        padding-top: 20rpx;
        border-top: 1px solid #f6f6f6;

        .goods-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20rpx;

          .pic {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80rpx;
            height: 80rpx;
            margin-right: 28rpx;
            background-color: #f6f6f6;
            border-radius: 8rpx;

            image {
              width: 80%;
              height: 80%;
            }
          }

          .title {
            flex: 1;
            font-size: 30rpx;
            font-weight: 500;
            color: #8F99A7;
            display: -webkit-box;
            overflow: hidden;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
          }

          .price,
          .num {
            font-size: 28rpx;
            font-weight: 500;
            color: #80C5CD;
          }

          .price {
            padding: 0 16rpx;
          }
        }
     
      }

      .icon {
        text-align: center;
        border-top: 1px solid #f6f6f6;
      }

    }
  }
</style>
