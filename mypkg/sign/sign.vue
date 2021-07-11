<template>
  <view class="page">

    <view class="top-box">
      <view class="view">
        <view class="avatar">
          <view class="pic">
            <image src="/static/avatar.png" mode=""></image>
          </view>
        </view>
        <view class="text">
          <view class="title">已连续签到 5 天</view>
          <view class="intro">明日签到可获得 3 积分</view>
        </view>
      </view>
      <view class="integral">
        <image src="/static/images/sign.png" mode=""></image>
        <text class="text2">8888</text>
        <uni-icons type="arrowright" size="12" color="#FFA424"></uni-icons>
      </view>
    </view>

    <view class="sign-box">
      <view class="clearfix">
        <view class="sign-item" v-for="item in 6" :key='item'>
          <view class="date">06.28</view>
          <image src="/static/images/sign.png"></image>
          <view class="code">+1积分</view>
        </view>
        <view class="sign-item active" @click="showPopup">
          <image src="/static/images/sign.png"></image>
          <view class="right">
            <view class="date">06.28</view>
            <view class="code">+7积分</view>
          </view>
        </view>
      </view>

      <view class="rules-box">
        <view class="title">签到规则</view>
        <view class="text">1.第1天为1积分，第2天为1积分，第3天为2积分，第4天为2积分，第5天为3积分，第6天为3积分，第7天为7积分，连续签到每日可领取的积分上限为7积分</text>
          <view class="text text1">2.若签到中断则重新计算</view>
        </view>
      </view>
    </view>

    <!-- 弹出层 -->
    <uni-popup ref="popup" type="center">
      <sign-popup></sign-popup>
    </uni-popup>

  </view>
</template>

<script>
  import signPopup from '../sign-popup/sign-popup.vue'

  export default {
    components: {
      signPopup
    },
    data() {
      return {

      };
    },
    methods: {
      showPopup() {
        console.log('popup')
        this.$refs.popup.open()
      }
    }
  }
</script>

<style lang="scss">
  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 372rpx;
    padding: 52rpx 30rpx 200rpx;
    background: #294D7C;
    box-sizing: border-box;

    .view {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      width: 120rpx;
      height: 120rpx;
      background: #FFFFFF;
      border-radius: 50%;

      .pic {
        width: 108rpx;
        height: 108rpx;
        border-radius: 50%;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }

    .text {
      margin-left: 15px;
      color: #FFFFFF;

      .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #FFFFFF;
      }

      .intro {
        font-size: 24rpx;
        font-weight: 500;
      }
    }

    .integral {
      display: flex;
      justify-content: space-around;
      align-items: center;
      // width: 170rpx;
      height: 60rpx;
      padding-left: 10px;
      padding-right: 5px;
      background: #FFFFFF;
      border-radius: 20px;

      image {
        width: 18px;
        height: 18px;
      }

      .text2 {
        font-size: 24rpx;
        font-weight: bold;
        padding: 0 10rpx;
        color: #FFA424;
      }

    }
  }

  .sign-box {
    position: absolute;
    top: 202rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 690rpx;
    height: 700rpx;
    padding-left: 30rpx;
    background: #FFFFFF;
    border-radius: 8rpx;
    box-sizing: border-box;

    .sign-item {
      float: left;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 138rpx;
      height: 150rpx;
      margin-top: 30rpx;
      margin-right: 26rpx;
      padding: 10rpx 0;
      font-size: 24rpx;
      color: #8F99A7;
      background: #F6F6F6;
      box-sizing: border-box;
      border-radius: 4px;

      image {
        width: 50rpx;
        height: 50rpx;
      }

      .code {
        font-size: 24rpx;
        font-weight: 500;
        color: #294D7C;
      }

      &:last-child {
        display: flex;
        flex-direction: row;
        width: 302rpx;

        image {
          width: 74rpx;
          height: 74rpx;
        }

        .right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .code {
          margin-right: -5rpx;
          font-size: 32rpx;
        }
      }

      &.active {
        color: #FFA424;
        background: #FEE7D6;
        border-radius: 4px;

        .date {
          opacity: 0.54;
        }

        .code {
          color: #FFA424;
          opacity: 1;
        }
      }
    }

    .clearfix::after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    .rules-box {
      padding-right: 30rpx;

      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #000104;
        padding-top: 40rpx;
        padding-bottom: 30rpx;
      }

      .text {
        font-size: 24rpx;
        font-weight: 500;
        color: #8F99A7;
      }

      .text1 {
        margin-top: 30rpx;
      }
    }




  }
</style>
