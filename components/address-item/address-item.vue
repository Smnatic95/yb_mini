<template>

  <view class="address-item" @click="addressChecked">
    <view class="receiver">
      <view class="name">{{address.receiver}}</view>
      <view class="default">{{address.address_id==default_address_id?'默认':''}}</view>
    </view>
    <view class="mobile">{{address.mobile}}</view>
    <view class="address">
      {{address.address[0].text}}{{address.address[1].text}}{{address.address[2].text}}{{address.detail_address}}</view>
  </view>

</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: "address-item",
    props: {
      address: {
        type: Object,
        default: {}
      },
    },
    computed: {
      ...mapState('address', ['default_address_id']),
    },
    data() {
      return {};
    },

    methods: {
      // 结算页面选择地址
      addressChecked() {
        // console.log(this.address)
        this.$emit('change-address', this.address)
      },




    }
  }
</script>

<style lang="scss">
  @import '../../static/iconfont/iconfont.css';

  .address-item {
    background-color: #FFFFFF;
    margin: 0 30rpx 30rpx;
    padding: 24rpx 30rpx;
    border-radius: 4px;

    .receiver {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .default {
        font-size: 28rpx;
        color: #FFA424;
      }
    }

    .name {
      font-size: 30rpx;
      font-weight: bold;
      color: #000104;
    }

    .mobile {
      margin-bottom: 14rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: #000104;
    }

    .address {
      font-size: 24rpx;
      color: #C0C8D3;
    }
  }

  .slot-btns {
    display: flex;
    align-items: center;
    // margin: 0 30rpx 30rpx 0;
    margin-bottom: 30rpx;
    margin-right: 10rpx;

    // margin-left: -10rpx;
    // background-color: #007AFF;  


    >view {
      // float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 100%;
      margin-right: 20rpx;
      padding: 0 20rpx;
      width: 50px;
      height: 50px;
      color: #C0C8D3;
      background-color: #FFFFFF;
      border-radius: 25px;
      box-sizing: border-box;

      .iconfont {
        font-size: 20px;
      }
    }


  }
</style>
