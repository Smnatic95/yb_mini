<template>
  <view class="page">

    <view class="box1">
      <view class="bg">
        <image src="/static/images/bg1.png"></image>
      </view>
      <view class="content">
        <view class="user">
          <view class="avatar">
            <!-- <image :src="userInfo.avatar"></image> -->
            <open-data type="userAvatarUrl" mode="aspectFill"></open-data>
          </view>
          <view class="uname">
            <open-data type="userNickName" style="color: #333;"></open-data>
          </view>
        </view>
        <view class="text">
          <text>开通会员即享权益</text>
          <button open-type="contact">联系客服开通</button>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="title">
        <view class="bg">
          <image src="/static/images/vipbg.png"></image>
          <view class="text">
            <view class="iconfont icon-v">VIP会员尊享权益</view>
          </view>
        </view>
      </view>

      <view class="privilege">
        <view class="privilege-item" v-for="item in 6" :key='item'>
          <view class="pic">
            <image src="https://picsum.photos/id/37/200/200"></image>
          </view>
          <view class="text">
            <view class="text1">会员优惠券</view>
            <view class="text2">每月可得优惠券</view>
          </view>
        </view>
      </view>
    </view>

    <view class="coupons-box">
      <view class="title">
        <view >优惠券</view>
        <view >开通即自动领取</view>
      </view>

      <scroll-view class="scroll-view_H" scroll-x="true">
        <view class="scroll-view-item_H">
          <view class="container">
            <view class="price">10</view>
            <view class="text">
              <view class="text1">会员优惠券</view>
              <view class="text2">满60元可用</view>
            </view>
          </view>
        </view>
        <view class="scroll-view-item_H">
          <view class="container">
            <view class="price">20</view>
            <view class="text">
              <view class="text1">会员优惠券</view>
              <view class="text2">满300元可用</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="btn-box">
      <button  open-type="contact">联系客服开通</button>
    </view>

   <!-- <uni-popup ref="popup" type="center">
      <sale-code></sale-code>
    </uni-popup> -->

  </view>
</template>

<script>
  import signPopup from '../sign-popup/sign-popup.vue'

  import {
    mapState
  } from 'vuex'

  export default {
    components: {
      signPopup
    },
    data() {
      return {};
    },
    computed: {
      ...mapState('user', ['userInfo'])
    },
    methods: {
      showPopup() {
        // console.log('popup')
        this.$refs.popup.open()
      },

    }
  }
</script>

<style lang="scss">
  @import '@/static/iconfont/iconfont.css';

  .page {
    padding-bottom: 50px;
  }

  .box1 {
    background-color: #FFFFFF;

    .bg {
      position: relative;
      width: 750rpx;
      height: 328rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .content {
      position: absolute;
      top: 0rpx;
      left: 0rpx;
      width: 100%;
      padding: 88rpx 66rpx 0;
      box-sizing: border-box;

      .user {
        display: flex;
        align-items: center;

        .avatar {
          width: 100rpx;
          height: 100rpx;
          margin-right: 10px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #fff;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .uname {
          font-size: 30rpx;
          font-weight: bold;
          color: #333;
        }
      }
    }

    .text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 54rpx;

      font-size: 24rpx;
      color: #ae5a2a;
      
      button{
        height: 50rpx;
        line-height: 50rpx;
        margin: 0;
        font-size: 24rpx;
        color: #ae5a2a;
        background-color: #FFFFFF;
        border-radius: 25rpx;
        &::after{
          border: 0;
        }
      }

      >view {
        // width: 73px;
        // height: 22px;
        padding: 0 20rpx;
        line-height: 44rpx;
        text-align: center;
        background-color: #FFFFFF;
        // -webkit-border-radius: 11px;
        border-radius: 22rpx;
        // background-color: #fff;

      }
    }
  }

  .section {
    background-color: #FFFFFF;

    .title {
      display: flex;
      justify-content: center;
      padding: 34rpx 0;
      margin: 0;

      .bg {
        position: relative;
        width: 542rpx;
        height: 90rpx;

        image {
          width: 100%;
          height: 100%;
        }

        .text {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          width: 280rpx;
          font-weight: 700;
          font-size: 34rpx;
          // line-height: 1.1;
          color: #89735b;
        }
      }


    }

    .privilege {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 30rpx 14rpx;
      background-color: #FFFFFF;

      .privilege-item {
        display: flex;
        align-items: center;
        width: 340rpx;
        height: 140rpx;
        padding-left: 15px;
        -webkit-border-radius: 3px;
        border-radius: 6rpx;
        margin-bottom: 7px;
        background-color: #f7f7f7;
        box-sizing: border-box;

        .pic {
          width: 80rpx;
          height: 80rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .text {
          margin-left: 22rpx;
          margin-bottom: 2px;
          font-size: 26rpx;
          line-height: 36rpx;
          color: #333;

          view:nth-child(2) {
            font-size: 24rpx;
            color: #9a856d;
          }
        }
      }
    }
  }

  .coupons-box {
    margin-top: 20rpx;
    padding: 13px 10px 0;
    background-color: #FFFFFF;

    .title {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 16px;
      line-height: 22px;
      color: #333;

      view:nth-child(2) {
        margin-left: 10px;
        font-size: 12px;
        font-weight: 400;
        color: #797979;
      }
    }

    .scroll-view_H {
      // display: flex;
      // justify-content: space-around;
      white-space: nowrap;
      // padding-left: 10px;

      .scroll-view-item_H {
        display: inline-block;
        margin: 13px 10px 13px 0;
        width: 179px;
        // width: 50%;
        height: 74px;

        .container {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;

          .price {
            width: 120rpx;
            text-align: center;
            font-size: 60rpx;
            font-weight: 700;
            color: #754e19;
          }

          .text {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #5d3324;

            .text1 {
              font-weight: 700;
              font-size: 14px;
              line-height: 20px;
            }

            .text2 {
              font-size: 22rpx;
            }
          }
        }

        background: url(data:image/png;base64,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) no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .btn-box {
    background-color: #FFFFFF;
    margin-top: 10px;
    padding: 30rpx 20rpx;

    button {
      height: 80rpx;
      color: #5d3324 !important;
      background: linear-gradient(90deg, #fee2b7, #fdc383);

      &::after {
        border: unset;
      }
    }
  }
</style>
