<template>
  <view class="comments-page">
    <!-- <view class="comment-item" @click="gotoCommentDetail">
      <view class="user">
        <view>
          <view class="avatar">
            <image src="/static/avatar.png" mode=""></image>
          </view>
          <view class="username">
            <view class="name">用户名</view>
            <uni-rate :readonly="true" allow-half :value="2.5" size="10" />
          </view>
        </view>
        <view class="time">1小时前</view>
      </view>
      <view class="text">
        这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，
      </view>
    </view>

    <view class="comment-item">
      <view class="user">
        <view>
          <view class="avatar">
            <image src="/static/avatar.png" mode=""></image>
          </view>
          <view class="username">
            <view class="name">用户名</view>
            <uni-rate :readonly="true" allow-half :value="2.5" size="10" />
          </view>
        </view>
        <view class="time">1小时前</view>
      </view>
      <view class="text">
        这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，
      </view>
    </view>
    <view class="comment-item">
      <view class="user">
        <view>
          <view class="avatar">
            <image src="/static/avatar.png" mode=""></image>
          </view>
          <view class="username">
            <view class="name">用户名</view>
            <uni-rate :readonly="true" allow-half :value="2.5" size="10" />
          </view>
        </view>
        <view class="time">1小时前</view>
      </view>
      <view class="text">
        这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，
      </view>
    </view>
    <view class="comment-item">
      <view class="user">
        <view>
          <view class="avatar">
            <image src="/static/avatar.png" mode=""></image>
          </view>
          <view class="username">
            <view class="name">用户名</view>
            <uni-rate :readonly="true" allow-half :value="2.5" size="10" />
          </view>
        </view>
        <view class="time">1小时前</view>
      </view>
      <view class="text">
        这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，这里是评价内容，
      </view>
    </view>

 -->
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
    },
    onLoad(option) {
      console.log(option)
    },
    methods: {
      gotoCommentDetail() {
        let id = 3
        uni.navigateTo({
          url: '../comment_detail/comment_detail?id=' + id
        })
      }
    }
  }
</script>

<style lang="scss">
  .comments-page {
    min-height: 100vh;
    padding: 22rpx 0;
    box-sizing: border-box;
    background-color: #F6F6F6;

    .comment-item {
      margin-bottom: 22rpx;
      padding: 30rpx;
      background-color: #FFFFFF;

      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;

        >view {
          display: flex;
        }

        .avatar {
          width: 60rpx;
          height: 60rpx;
          border-radius: 50%;
          overflow: hidden;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .username {
          margin-left: 20rpx;

          .name {
            font-size: 26rpx;
            font-weight: bold;
            color: #242424;
          }
        }

        .time {
          font-size: 24rpx;
          font-weight: 500;
          color: #999999;
        }
      }

      .text {
        padding-top: 22rpx;
        font-size: 30rpx;
        font-weight: 500;
        line-height: 23px;
        color: #242424;
      }
    }

    .comment-item:last-child {
      margin-bottom: 0;
    }
  }
</style>
