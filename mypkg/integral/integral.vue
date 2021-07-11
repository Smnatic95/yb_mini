<template>
  <view class="integral-page">

    <view class="integral-top">
      <view class="title">我的积分</view>
      <view class="num">
        <image src="/static/images/sign.png" mode=""></image>
        <text>88</text>
      </view>
    </view>

    <view class="integral-item">
      <view class="title">
        <view class="type">签到</view>
        <view class="time">2020.06.28 15:50</view>
        <!-- <view class="order">20210629100150000008407</view> -->
      </view>
      <view class="num">
        <text>+88</text>
      </view>
    </view>
    <view class="integral-item">
      <view class="title">
        <view class="type">消费</view>
        <view class="time">2020.06.28 15:50</view>
        <view class="order">20210629100150000008407</view>
      </view>
      <view class="num">
        <text>+88</text>
      </view>
    </view>
    <view class="integral-item">
      <view class="title">
        <view class="type">抵扣</view>
        <view class="time">2020.06.28 15:50</view>
        <view class="order">20210629100150000008407</view>
      </view>
      <view class="num sub">
        <text>-15</text>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .integral-page {
    background-color: #f6f6f6;
    min-height: 100vh;
  }

  .integral-top,
  .integral-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;
    background: #FFFFFF;

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
      font-size: 44rpx;
      font-weight: bold;
      color: #FFA424;

      image {
        width: 52rpx;
        height: 52rpx;
        margin-right: 10rpx;
      }
    }

    .sub {
      color: #80C5CD;
    }
  }

  .integral-top {
    height: 120rpx;
    margin-bottom: 20rpx
  }

  .integral-item {
    padding: 10px 30rpx;
    margin-bottom: 2rpx;

    .type {
      color: #333333;
    }

    .num {
      font-size: 32rpx;
    }

    .order {
      font-size: 28rpx;
      font-weight: 500;
      color: #8F99A7;
    }
  }
</style>
