<template>
  <view class="pages">

    <!-- 用户信息 -->
    <view class="user-box">
      <view class="left">
        <view class="avatar">
          <!-- <image src="https://picsum.photos/id/305/200/200" mode=""></image> -->
            <open-data v-if="token" type="userAvatarUrl" mode="aspectFill"></open-data>
        </view>
        <view class="name">
          <view class="name">用户
            <view class="public">{{is_public_address?'已开启':'已关闭'}}</view>
          </view>
          <view class="text">已解锁<text>x</text>个救助站</view>
        </view>
      </view>
      <view class="right" @click="showPopup">
        开启公益地址
        <uni-icons type="arrowright" size="16" color=""></uni-icons>
      </view>
    </view>

    <!-- 证书 -->
    <view class="medal-box">
      <view class="medal-title">公益证书</view>
      <view class="medal-item" v-for="item in 2" :key='item'>
        <image src="/static/bg.png" mode=""></image>
      </view>

      <view class="medal-item" v-for="item in 3" :key='item'>
        <image src="/static/bg.png" mode=""></image>
        <!-- 遮罩层 -->
        <view class="mask">
          <image src="/static/images/suo.png" mode="heightFix"></image>
        </view>
      </view>

    </view>

    <uni-popup ref="popup" type="center">
      <view class="popup-box">
        <view class="text">
          确认开启后将在提交订单页面展示切换地址选项
        </view>
        <button @click="undatePublic">{{is_public_address?'点击关闭':'点击开启'}}</button>
      </view>
    </uni-popup>

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {};
    },
    computed: {
      ...mapState('address', ['is_public_address']),
      token() {
        return JSON.parse(uni.getStorageSync('token'))
      }
    },
    methods: {
      ...mapMutations('address', ['updatePublicAddress']),

      showPopup() {
        this.$refs.popup.open('top')
      },
      // 更新公共地址状态
      undatePublic() {
        // console.log(this.is_public_address)
        // this.is_public_address = !this.is_public_address
        this.updatePublicAddress(!this.is_public_address)
        this.$refs.popup.close()

      }
    }
  }
</script>

<style lang="scss">
  .pages {
    background-color: #1CBBB4;
    min-height: 100vh;
    box-sizing: border-box;
  }

  // 用户信息
  .user-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 20px;
    // background-color: tomato;

    .left {
      display: flex;
      align-items: center;

      .avatar {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #FFFFFF;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        color: #FFFFFF;

        .name {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 16px;

          .public {
            height: 18px;
            line-height: 18px;
            margin-left: 10px;
            padding: 0 6px;
            font-weight: 400;
            font-size: 12px;
            color: #777;
            background-color: #FFFFFF;
            border-radius: 9px;
          }
        }

        .text {
          font-size: 14px;

          text {
            padding: 0 5px;
          }
        }
      }
    }

    .right {
      padding: 0 15px;
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      font-weight: bold;
      color: #1CBBB4;
      background-color: #FFFFFF;
      border-radius: 18px;
    }
  }

  // 勋章
  .medal-box {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 0 20px 20px;
    background-color: #FFFFFF;
    border-radius: 10px;

    // height: 500px;

    .medal-title {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      margin-top: -15px;
      font-weight: bold;
      font-size: 18px;
      color: #FFFFFF;
      background-color: #39B54A;
    }

    .medal-item {
      position: relative;
      width: 100%;
      height: 80px;
      margin-top: 15px;
      // margin: 20px 15px 0;
      border-radius: 10px;
      overflow: hidden;

      background-color: #1CBBB4;

      image {
        width: 100%;
      }

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.4;

        image {
          height: 40px;
          transform: rotate(-30deg);
        }
      }
    }
  }

  // 弹出层
  .popup-box {
    position: relative;
    height: 200px;
    // padding-top: 30px;
    padding: 30px 15px;
    margin: 30px;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-sizing: border-box;

    .text {
      text-align: center;
      color: #3B4144;
    }

    button {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      height: 50px;
      margin: 0 20px;
      color: #FFFFFF;
      background-color: #1CBBB4;
      border-radius: 25px;

      &::after {
        border: 0;
      }
    }
  }
</style>
