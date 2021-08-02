<template>
  <view class="pupup-box">
    <image src="/static/images/sign-succ.png"></image>
    <view class="title">签到成功</view>
    <view class="text">连续签到 <text>{{total}}</text> 天</view>
    <view class="text">今日增加 <text>{{integral}}</text> 积分</view>
    <view class="btn">明天提醒我</view>
    <view class="text2">明日签到可获得<text> {{next_integral}} </text>积分</view>
  </view>
</template>

<script>
  export default {
    props: {
      day: {
        type: Number,
        default: 0
      },
      integral: {
        type: Number,
        default: 0
      },
      next_integral: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .pupup-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 570rpx;
    // height: 630rpx;
    padding-top: 76rpx;
    padding: 76rpx 0 86rpx;
    background: #FFFFFF;
    box-sizing: border-box;
  }

  image {
    width: 124rpx;
    height: 124rpx;
  }

  .title {
    font-size: 44rpx;
    font-weight: bold;
    color: #294D7C;
    margin: 16rpx 0 12rpx;
  }

  .text {
    font-size: 32rpx;
    font-weight: 500;
    color: #444D52;
    margin-bottom: 8rpx;

    text {
      color: #FFA424;
      padding: 0 10rpx;
    }
  }

  .btn {
    width: 230rpx;
    height: 60rpx;
    text-align: center;
    line-height: 60rpx;
    font-size: 28rpx;
    color: #FFFFFF;
    background: #FFA424;
    margin: 30rpx 0;
    border-radius: 4px;
  }

  .text2 {
    font-size: 24rpx;
    font-weight: 500;
    color: #444D52;

    text {
      padding: 0 10rpx;
    }
  }
</style>
