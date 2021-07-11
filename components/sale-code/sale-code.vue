<template>
  <view class="popup-box">
    <image src="/static/pics/banner1-active.jpg" mode="widthFix" @click="scanCode"></image>
  </view>
</template>

<script>
  export default {
    name: "sale-code",
    data() {
      return {

      };
    },
    methods: {
      scanCode() {
        uni.scanCode({
          success(res) {
            console.log(res)
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .popup-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600rpx;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;

    image {
      width: 100%;
    }
  }
</style>
