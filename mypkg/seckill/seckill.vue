<template>
  <view class="page">
    <view class="pic-box">
      <image src="/static/images/bg1.png" mode="widthFix"></image>
    </view>

    <view class="time-box">
      <view class="icon">
        <image src="/static/images/hot-icon.png" mode="widthFix"></image>
      </view>
      <view :class="['time',active==i?'active':'']" v-for="(item,i) in timeArr" :key='item' @click="activeClick(i)">
        <view class="title">{{item}}</view>
        <view class="status">即将开始</view>
      </view>
    </view>

    <block v-for="(item,i) in cart_list" :key='i'>
      <goods-item :goods='item' :showRadio='false' :showNumBox='false'></goods-item>
    </block>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {
        active: 0,
        timeArr: ['10:00', '12:00', '15:00'],
      };
    },
    computed: {
      ...mapState('cart', ['cart_list']),
    },
    onLoad() {
      console.log(this.cart_list)
    },
    methods: {
      activeClick(i) {
        this.active = i
        console.log(this.cart_list)
      }
    }
  }
</script>

<style lang="scss">
  .page {
    padding-top: 10px;
  }

  .pic-box {
    height: 150px;
    margin: 0 10px;
    border-radius: 10px;
    overflow: hidden;

    image {
      width: 100%;
    }
  }

  .time-box {
    display: flex;
    align-items: center;
    height: 63px;
    padding: 0 10px;

    image {
      width: 37px;
      margin-top: 12px;
    }

    .time {
      margin-left: 20px;
      text-align: center;

      .title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .status {
        height: 18px;
        font-size: 12px;
        color: #666;
      }

      &.active {
        .title {
          color: #1db0fc;
        }

        .status {
          padding: 0 5px;
          color: #FFFFFF;
          background: linear-gradient(270deg, #1db0fc, #22cafd);
          border-radius: 9px;
        }
      }
    }
  }

  .goods-item {
    margin: 10px 10px 0;
    border-radius: 10px !important;
  }
</style>
