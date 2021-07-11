<template>
  <view>
    <view class="comment-item" @click="gotoCommentDetail">
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

  <!--  <view class="comment-item" @click="gotoCommentDetail">
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
    <view class="comment-item" @click="gotoCommentDetail">
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
    <view class="comment-item" @click="gotoCommentDetail">
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
  
  </view>
</template>

<script>
  export default {
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
  .comment-item {
    margin-bottom: 11px;
    padding: 15px;
    background-color: #FFFFFF;

    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;

      >view {
        display: flex;
      }

      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .username {
        margin-left: 10px;

        .name {
          font-size: 13px;
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
      padding-top: 11px;
      font-size: 15px;
      font-weight: 500;
      line-height: 23px;
      color: #242424;
    }
  }

  .comment-item:last-child {
    margin-bottom: 0;
  }
</style>
