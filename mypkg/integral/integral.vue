<template>
  <view class="integral-page">

    <view class="integral-top">
      <view class="title">我的积分</view>
      <view class="num">
        <image src="/static/images/sign.png" mode=""></image>
        <text>{{total}}</text>
      </view>
    </view>

    <view class="scroll-box">
      <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
        <view id="demo1" :class="['scroll-view-item_H',i===active?'active':'']" v-for="(item,i) in scrollList" :key='i'
          @click="activeChanged(item,i)">{{item.title}}</view>
      </scroll-view>
    </view>

    <block v-for="(item,i) in integralList" :key='i'>
      <!--   <view class="integral-item">
        <view class="title">
          <view class="type">签到</view>
          <view class="time">2020.06.28 15:50</view>
        </view>
        <view class="num">
          <text>+88</text>
        </view>
      </view> -->
      <view class="integral-item">
        <view class="title">
          <view class="type">
            <text v-if="item.type==1">充值</text>
            <text v-if="item.type==2">消费</text>
            <text v-if="item.type==3">退款</text>
            <text v-if="item.type==4">下单</text>
            <text v-if="item.type==5">签到</text>
          </view>
          <view class="time">{{item.create_time}}</view>
          <view class="order">{{item.order_id}}</view>
        </view>
        <!-- 充值 消费 退款 下单 签到 -->
        <view class="num" v-if="!(item.type==3||item.type==4)">
          <text>+{{item.num}}</text>
        </view>
        <view class="num sub" v-else>
          <text>-15</text>
        </view>
      </view>
      <!--  <view class="integral-item">
        <view class="title">
          <view class="type">抵扣</view>
          <view class="time">2020.06.28 15:50</view>
          <view class="order">20210629100150000008407</view>
        </view>
        <view class="num sub">
          <text>-15</text>
        </view>
      </view> -->

    </block>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        scrollList: [{
          title: '签到',
          type: 5
        }, {
          title: '充值',
          type: 1
        }, {
          title: '消费',
          type: 2
        }, {
          title: '兑换',
          type: 3
        }, {
          title: '退款',
          type: 4
        }],
        active: 0,
        type: 5,
        integralList: []
      };
    },
    onLoad() {
      this.getIntegralList()
    },
    computed: {
      total() {
        return JSON.parse(uni.getStorageSync('userInfo')).bonus_money
      }
    },
    methods: {
      async getIntegralList() {
        this.integralList = []
        const {
          mobile
        } = JSON.parse(uni.getStorageSync('userInfo'))
        const {
          data: res
        } = await uni.$http.get(`integral_user/${mobile}/${this.type}/`)
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        this.integralList = res.lists

        console.log(this.integralList)
      },

      activeChanged(item, i) {
        this.active = i
        this.type = item.type
        console.log(item, i)
        this.getIntegralList()
      },

    }
  }
</script>

<style lang="scss">
  .integral-page {
    padding-bottom: 50px;
    background-color: #f6f6f6;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .integral-top,
  .integral-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;
    background: #FFFFFF;

    .title {
      font-size: 30rpx;
      font-weight: bold;
      color: #000104;

      .time {
        font-size: 24rpx;
        font-weight: 500;
        color: #C0C8D3;
      }
    }

    .num {
      display: flex;
      align-items: center;
      font-size: 44rpx;
      font-weight: bold;
      color: #FFA424;

      image {
        width: 52rpx;
        height: 52rpx;
        margin-right: 10rpx;
      }
    }

    .sub {
      color: #80C5CD;
    }
  }

  .integral-top {
    height: 120rpx;
    margin-bottom: 20rpx
  }

  .integral-item {
    padding: 10px 30rpx;
    margin-bottom: 2rpx;

    .type {
      color: #333333;
    }

    .num {
      font-size: 32rpx;
    }

    .order {
      font-size: 28rpx;
      font-weight: 500;
      color: #8F99A7;
    }
  }

  // 分类
  .scroll-box {
    position: sticky;
    top: 0;
    padding: 0 15px;
    margin-bottom: 10px;
    background-color: #FFFFFF;

    .scroll-view_H {
      white-space: nowrap;
      width: 100%;

      .scroll-view-item_H {
        display: inline-block;
        padding: 12px 0;
        width: 20%;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #8F99A7;

        &.active {
          color: #294D7C;
          font-weight: blod;
        }
      }
    }
  }
</style>
