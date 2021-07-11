<template>
  <view class="page">

    <view class="card-item">
      <view class="card">
        <view class="title">原本猫砂年卡</view>
        <view class="num">x11</view>
      </view>

      <view class="record-box">
        <view class="record" v-if="isShowDetail">

          <view class="record-item">
            <view class="top">
              <view class="left">
                <!-- <view class="time">20210629100150000008407</view> -->
                <view class="price">￥960.00</view>
                <view class="time">2020.03.23 15:50</view>
                <view class="type">20210629100150000008407</view>
              </view>
              <view class="right">
                <view class="add">+12</view>
                <!-- <view class="sub">-1</view> -->
              </view>
            </view>
          </view>
          <view class="record-item">
            <view class="top">
              <view class="left">
                <!-- <view class="time">20210629100150000008407</view> -->
                <view class="price sub">￥0</view>
                <view class="time">2020.03.23 15:50</view>
                <view class="type">20210629100150000008407</view>
              </view>
              <view class="right">
                <!-- <text class="add">+12</text> -->
                <text class="sub">-1</text>
              </view>

            </view>
            <view class="goods-item">
              <view class="pic">
                <image src="/static/goods1.png" mode=""></image>
              </view>
              <view class="title">原本成年猫粮原本成年猫粮原本成年猫粮原本成年猫粮原本成年猫粮</view>
              <view class="price">￥199.00</view>
              <view class="num">x1</view>
            </view>
          </view>
        </view>

        <view class="icon" @click='iconClick'>
          <uni-icons v-if="isShowDetail" type="arrowup" size="14" color="#c0c8d3"></uni-icons>
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
        isShowDetail: false
      };
    },
    methods: {
      iconClick() {
        this.isShowDetail = !this.isShowDetail
      }
    }
  }
</script>

<style lang="scss">
  .page {
    padding-top: 20rpx;
  }

  .card-item {
    display: flex;
    flex-direction: column;
    padding: 0 30rpx;
    margin-bottom: 20rpx;
    background: #FFFFFF;

    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 120rpx;

      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #000104;

        .time {
          font-size: 24rpx;
          font-weight: 500;
          color: #C0C8D3;
        }
      }

      .num {
        display: flex;
        align-items: center;
        font-size: 32rpx;
        font-weight: bold;
        color: #FFA424;

        &.sub {
          color: #80C5CD;
        }
      }
    }

    .record-box {
      .record {
        // padding-top: 20rpx;
        border-top: 1px solid #f6f6f6;

        // .record-item:not(:last-child) {
        .record-item:not(:last-child) {
          border-bottom: 1px solid #f6f6f6;
        }

        .top:last-child {
          margin-bottom: 0;
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20rpx;
          margin-bottom: 20rpx;
          margin-top:10px;

          .left {
            .type {
              // display: flex;
              font-size: 30rpx;
              font-weight: 500;
              color: #8F99A7;
            }

            .time {
              font-size: 12px;
              font-weight: 500;
              color: #C0C8D3;
            }

            .price {
              margin-right: 10px;
              color: #FFA424;

              &.sub {
                color: #80C5CD !important;
              }
            }
          }

          .right {
            display: flex;
            font-size: 28rpx;
            font-weight: 500;

            .add {
              color: #FFA424;
            }

            .sub {
              color: #80C5CD;
            }
          }
        }
      }

      .icon {
        text-align: center;
        border-top: 1px solid #f6f6f6;
      }

    }
  }

  .goods-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    // border-top: 1px solid #f6f6f6;

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
</style>
