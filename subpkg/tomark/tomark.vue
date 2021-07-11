<template>
  <view class="mark-page">
    <view class="rate-box">
      <view class="title">满意度评价</view>
      <uni-rate :size="35" :margin="10" :is-fill="false" v-model="value" />
    </view>
    <view class="conent">
      <textarea placeholder-style="color:#C0C8D3" placeholder="请输入您的评价" maxlength='-1' v-model='textarea' />
    </view>
    <view class="button" @click="onSubmit">提 交</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        value: 0,
        textarea: '',
      };
    },
    methods: {
      onSubmit() {
        console.log(this.value, this.textarea)
      }
    }
  }
</script>

<style lang="scss">
  .mark-page {
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    background: #F6F6F6;
    min-height: 100vh;
    padding-top: 22rpx;
    box-sizing: border-box;

    .rate-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 230rpx;
      padding-top: 20rpx;
      background: #FFFFFF;

      .title {
        padding: 30rpx;
        font-size: 36rpx;
        font-weight: bold;
        color: #000104;
      }
    }

    .conent {
      // flex: 1;
      margin: 20rpx 0;
      background-color: #FFFFFF;

      textarea {
        width: 100%;
        height: 500rpx;
        padding: 22rpx 30rpx;
        box-sizing: border-box;
      }
    }

    .button {
      // height: 100rpx;
      // width: 100%;
      font-size: 30rpx;
      font-weight: bold;
      line-height: 100rpx;
      text-align: center;
      color: #294D7C;
      background-color: #FFFFFF;
    }
  }
</style>
