<template>
  <view class="comment_detail-page">
    <view class="goods">
      <view class="pic">
        <image src="../../static/goods1.png" mode=""></image>
      </view>
      <view class="text">
        <text class="title">原本成年猫粮</text>
        <text class="intro">天然五谷更健康</text>
      </view>
    </view>
    <my-comment></my-comment>
  </view>
</template>

<script>
  import myComment from '../my-comment/my-comment.vue'
  export default {
    components: {
      myComment
    },
    data() {
      return {

      };
    }
  }
</script>

<style lang="scss">
  .comment_detail-page {
    min-height: 100vh;
    background-color: #f6f6f6;

    .goods {
      display: flex;
      // align-items: center;
      // height: 100px;
      padding: 15px;
      margin-bottom: 10px;
      box-sizing: border-box;
      background: #FFFFFF;

      .pic {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;
        margin-right: 15px;
        background-color: #f5f5f5;
        border-radius: 6px;
        overflow: hidden;

        image {
          width: 80%;
          height: 80%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .title {
          font-size: 17px;
          font-weight: bold;
          color: #000104;
        }

        .intro {
          font-size: 14px;
          font-weight: 500;
          color: #C0C8D3;
        }
      }
    }
  }
</style>
