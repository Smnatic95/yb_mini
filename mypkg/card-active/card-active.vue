<template>
  <view class="page">

    <view class="xcimg">
      <image :src="xcimg" mode="widthFix"></image>
    </view>

    <view class="btn-box">
      <button @click="showPopup">购买年卡 >></button>
    </view>

    <uni-popup ref="popup" type="center">
      <sale-code></sale-code>
    </uni-popup>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        xcimg: uni.$baseUrl1 + 'yb-poster-001.jpg'
      };
    },
    methods: {
      showPopup() {
        // this.$refs.popup.open();
        uni.navigateTo({
          url:'/mypkg/vip/vip'
        })
      },
    }
  }
</script>

<style lang="scss">
  .xcimg {
    width: 100%;

    image {
      width: 100%;
    }
  }


  .btn-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    display: flex;
    justify-content: center;

    button {
      width: 232rpx;
      height: 80rpx;
      line-height: 80rpx;
      color: #FFFFFF;
      background-color: #294D7C;
      border-radius: 50rpx;
      font-size: 27rpx;
      opacity: .9;


      &::after {
        border: 0;
      }
    }
  }
</style>
