<template>
  <view class="mainCnt">
    <view class="info_top">
      <view class="toa">
        计算结果Calculation results
      </view>
    </view>

    <view class="menus">
      <view class="menu">
        <view class="title">
          所需能量 (Kcal/kg)
        </view>
        <view class="val">
          {{res.need_energy}} 
        </view>
      </view>
      <view class="menu">
        <view class="title">
          日喂食量 (g/天)
        </view>
        <view class="val">
          {{res.day_feeding_amount}}
        </view>
      </view>
      <button class="btn_share" open-type="share">
        分享给好友
      </button>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        countForm: null,
        res: null
      }
    },
    onLoad(options) {
      if (options.countForm && options.res) {
        this.countForm = JSON.parse(options.countForm);
        this.res = JSON.parse(options.res);
      } else {
        uni.switchTab({
          url: "/pages/home/home",
        })
      }
    },
    onShareAppMessage() {
      const id = uni.getStorageSync('id')
      const is_staff = uni.getStorageSync('is_staff')
      const parent_id = uni.getStorageSync('parent_id')

      let p_id = 0
      if (!parent_id && !id && !is_staff) p_id = 0
      if (parent_id == 0) {
        if (is_staff) {
          p_id = id
        }
      } else {
        p_id = parent_id
      }
      console.log('分享路径', "/mypkg/count/count?parent_id=" + p_id);
      return {
        title: "邀请您使用宠物喂食计算器,快来看看吧!",
        imageUrl: '/static/images/share1.jpg',
        path: "/mypkg/count/count?parent_id=" + p_id
      }
    }
  }
</script>

<style lang="scss">
  .mainCnt {
    width: 100vw;
    box-sizing: border-box;
    padding: 0 100rpx;

    .info_top {
      width: 100%;
      padding: 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .toa {
        text-align: center;
        color: #9A9A9A;
        font-size: 30rpx;
      }

      .info_list {
        display: flex;
        justify-content: center;
        margin-top: 20rpx;

        .info_item {
          padding: 5rpx 30rpx;
          background-color: #294D7C;
          color: #ffff;
          border-radius: 30rpx;
          font-weight: 300;
        }
      }

    }

    .menus {
      .menu {
        .title {
          padding: 30rpx 0;
          color: #294D7C;
          font-weight: 600;
          font-size: 34rpx;
        }

        .val {
          background-color: #E6E6E6;
          height: 80rpx;
          line-height: 80rpx;
          width: 100%;
          border-radius: 30rpx;
          padding: 0 20rpx;
          color: #2f3542;
        }
      }
    }

    .btn_share {
      width: 70%;
      margin: 0 auto;
      border-radius: 60rpx;
      margin-top: 130rpx;
      color: #fff;
      background-color: #294D7C;
    }

  }
</style>
