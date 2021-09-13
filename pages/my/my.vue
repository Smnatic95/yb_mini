<template>
  <my-notlogin v-if="!token"></my-notlogin>
  <my-islogin v-else></my-islogin>
</template>

<script>
  import {
    mapState,
    mapMutations,
    createNamespacedHelpers
  } from 'vuex'
  const {
    mapState: mapStateUser
  } = createNamespacedHelpers("user")
  const {
    mapState: mapStatePet
  } = createNamespacedHelpers("pet")
  import badgeMix from '@/mixins/tabbar-badge.js'
  import shareMix from '@/mixins/share-app.js'

  export default {
    mixins: [badgeMix, shareMix], // 导入公共js
    data() {
      return {
        user_info: {},
      };
    },
    onShow() {},
    onLoad() {},

    computed: {
      ...mapStateUser(['userInfo', 'token']),
      ...mapStatePet(['petList']),
    },

    methods: {
      ...mapMutations('user', ['undateToken', 'updateUserInfo'])
    },

    async onPullDownRefresh() {
      const mobile = JSON.parse(
        uni.getStorageSync('userInfo') || "{}"
      ).mobile;
      if (!mobile) return uni.stopPullDownRefresh()
      const {
        data: res
      } = await uni.$http.get(`user_phone/${mobile}/`)
      if (res.code !== 200) return uni.$showMsg(res.msg)
      uni.stopPullDownRefresh()
      this.undateToken(true)
      this.updateUserInfo(res.user_list[0])
    }

  }
</script>

<style lang="scss">
  @import '../../static/iconfont/iconfont.css';

  .number-btn {
    padding: 0;
    border: unset;
    border-radius: 0;

    &::after {
      border: unset !important;
    }
  }

  button[plain] {
    border: unset;
  }

  .page {
    padding-bottom: 2rpx;
  }

  .mask {
    image {
      width: 750rpx;
      height: 338rpx;
    }
  }

  .user {
    position: absolute;
    // top: 30rpx;
    top: 0;
    left: 0;
    width: 750rpx;
    height: 338rpx;
    padding-top: 20rpx;
    // background: url(/static/bg.png) no-repeat 100%;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid transparent;

      .user1 {
        display: flex;
        align-items: center;
        float: left;

        .avatar-box {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 130rpx;
          height: 130rpx;
          margin-left: 30rpx;
          background: #FFFFFF;
          box-shadow: 0px 9px 13px rgba(192, 200, 211, 0.53);
          border-radius: 50%;

          .avatar {
            width: 90%;
            height: 90%;
            border-radius: 50%;
            overflow: hidden;

            image {
              width: 100%;
              height: 100%;
            }
          }

        }

        // 用户名
        .info-box {
          margin-left: 15px;

          .name {
            width: 130px;
            font-size: 16px;
            font-weight: bold;
            text-overflow: ellipsis;
            overflow: hidden;
            color: #FFFFFF;
            text-align: left;
            // background-color: cyan;
          }

          .mobile {
            margin-top: 3px;
            font-size: 13px;
            font-weight: 500;
            color: #FFFFFF;
          }
        }
      }

      .sign {
        // float: right;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 50px;
        padding-left: 10rpx;
        // margin-top: 20rpx;
        background: #FFFFFF;
        border-radius: 27px 0px 0px 27px;

        image {
          width: 24px;
          height: 24px;
        }

        view {
          margin-left: 10rpx;
          font-size: 14px;
          font-weight: bold;
          color: #FFA424;
        }
      }
    }

    .center {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 40rpx;
      padding: 0 15px;
      color: #FFFFFF;

      >view {
        flex: 1;
        display: flex;
        flex-direction: column;
        // text-align: center;
        justify-content: center;
        align-items: center;
        height: 30rpx;

        &:not(:last-child) {
          border-right: 2px solid #FFFFFF;
        }

        .num {
          height: 20px;
          font-size: 16px;
          font-weight: bold;
        }

        .type {
          font-size: 12px;
        }
      }
    }

    .vip-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 61rpx;
      margin-left: 140rpx;
      font-size: 14px;
      color: #905100;
      width: 550rpx;

      text,
      view {
        line-height: 15px;
        // height: 14px;
      }

      view {
        font-size: 12px;
      }
    }

    .bottom {
      width: 690rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 160rpx;
      padding: 40rpx;
      box-sizing: border-box;
      background: #121B39;
      border-radius: 8px 8px 0px 0px;

      >image {
        width: 112rpx;
        height: 45rpx;
      }

      .left {
        display: flex;
        align-items: flex-end;

        image {
          width: 26rpx;
          height: 34rpx;
        }

        .balance {
          margin-bottom: -20rpx;
          margin-left: 10rpx;
          margin-right: 12rpx;
          font-size: 60rpx;
          font-weight: bold;
          color: #E0C699;
        }

        .text {
          font-size: 24rpx;
          font-weight: 500;
          color: #E0C699;

          text {
            font-size: 24rpx;
            font-weight: 500;
            color: #E0C699;

          }
        }
      }

      .right {
        width: 220rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        background: linear-gradient(135deg, #F4E6C3 0%, #D8B988 100%);
        border-radius: 8rpx;
        font-weight: bold;
        color: #121B39;
      }
    }
  }

  .order-box {
    background-color: #FFFFFF;
    margin: 10px;
    padding: 24rpx 30rpx 0;
    border-radius: 8px;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // padding: 24rpx 30rpx 0 30rpx;

      .left {
        font-size: 32rpx;
        font-weight: bold;
        color: #000104;
      }

      .right {
        font-size: 28rpx;
        font-weight: 500;
        color: #C0C8D3;


      }
    }

    .uni-grid {
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
      margin: 36rpx 0;
      // background-color: skyblue;

      .grid-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 28rpx;
        font-weight: 500;
        color: #000104;

        image {
          width: 70rpx;
          height: 70rpx;
          margin-bottom: 5rpx;
        }
      }
    }
  }

  .pet-box {
    background-color: #FFFFFF;
    margin: 10px;
    // padding-bottom: 10rpx;
    padding: 30rpx 30rpx 0;
    border-radius: 8px;

    .title {
      display: flex;
      justify-content: space-between;

      .left {
        font-size: 32rpx;
        font-weight: bold;
        color: #000104;
      }

      .right {
        font-size: 28rpx;
        font-weight: 500;
        color: #C0C8D3;
      }
    }

    .pet-info {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      border-bottom: 2rpx solid #F6F6F6;

      .avatar {
        width: 100rpx;
        height: 100rpx;
        background-color: #FFFFFF;
        border-radius: 50%;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        font-weight: bold;
        margin-left: 20rpx;
      }
    }

    .remind {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      padding: 0 10px;
      font-size: 14px;
      color: #929292;

      text {
        font-size: 18px;
        padding: 0 5px;
        color: #000;
      }
    }

    .addpet-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      // padding:  50rpx;
      height: 200rpx;

      button {
        padding: 0 30px;
        font-size: 16px;
        color: #555555;
        background-color: #FFFFFF;

        &::after {
          border-radius: 45px;
        }
      }
    }
  }

  .serve-box {
    // height: 300rpx;
    margin: 10px;
    padding: 30rpx;
    background-color: #FFFFFF;
    border-radius: 8px;

    .title {
      text-align: left;
      // margin-bottom: 30rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #000104;
    }

    .grid-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px 0;

      image {
        width: 25px;
        height: 25px;
        margin: 10px;
      }

      text {
        font-size: 14px;
      }
    }

  }

  .setting-box {
    // background-color: #FFFFFF;
    margin-bottom: 25rpx;

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30rpx;
      padding: 25rpx 60rpx;

      .left {
        display: flex;
        align-items: center;

        image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 20rpx;
        }

        text {
          font-weight: bold;
          color: #000104;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .num {
          padding-right: 8rpx;
          font-weight: bold;
          color: #FFA424;
        }

        image {
          width: 36rpx;
          height: 36rpx;
          margin-right: 10rpx;
        }

      }
    }
  }
</style>
