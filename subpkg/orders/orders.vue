<template>
  <view class="orders-page">
    <view class="tabs-box" scroll-x="true" @scroll="scroll" scroll-left="0">
      <view :class="['tabs-item',active==i? 'active':'']" v-for="(item,i) in tabsItem" :key='item.id'
        @click="activeChaned(i,item.id)">{{item.type}}</view>
    </view>

    <!-- <block v-for="order in orderList1" :key='order.order_id'> -->
    <!-- <my-orders :order='orderList1'></my-orders> -->
    <!-- </block> -->

    <view class="order-component">
      <view class="order-box" v-for="item in orderList1" :key='item.order_id'>
        <!-- 订单号 -->
        <view class="order-info">
          <view class="id">订单号：{{item.order_id}}</view>
          <view class="state">
            <text style="color: #80C5CD;" v-show="item.status==0">待支付</text>
            <text style="color: #80C5CD;" v-show="item.status==1">待收货</text>
            <text style="color: #80C5CD;" v-show="item.status==2">已完成</text>
            <text style="color: #FFA424;" v-show="item.status==3">已退款</text>
            <text style="color: #FFA424;" v-show="item.status==0&&item.tracking_number">未发货</text>
          </view>
        </view>

        <view class="time-box">
          <view class="price">优惠券：{{item.coupon}}</view>
          <view class="price">邮费：￥{{item.freight}}</view>
          <view class="price">实付总价：￥{{(Number(item.price)+Number(item.freight)-Number(item.coupon)).toFixed(2)}}</view>
          <view class="time">创建时间：{{item.create_time}}</view>
        </view>
        <!-- 商品详情 -->
        <view class="goods" v-for="(item2,i2) in item.order_goods" :key='i2'>
          <view class="pic">
            <image :src="'https://7n.oripetlife.com/'+item2.image" mode=""></image>
          </view>
          <view class="text">
            <view>
              <view class="title">{{item2.sku_name}}</view>
              <!-- <view class="intro">猫来了联名款</view> -->
            </view>
            <view class="price">
              <view class="price">￥<text>{{item2.price}}</text></view>
              <text class="num">x {{item2.count}}</text>
            </view>
          </view>
        </view>



        <view class="btns-box">
          <button @click="gotoTrick">查看物流</button>
          <!-- <button>确认收货</button> -->
          <!-- <button @click="gotoMark">立即评价</button> -->
          <!-- <button @click="gotoCommentDetail">查看评价</button> -->
        </view>
      </view>

    </view>

  </view>
</template>

<script>
  import myOrders from '../my-orders/my-orders.vue'

  export default {
    components: {
      myOrders
    },
    data() {
      return {
        tabsItem: [{
          type: '待支付',
          id: 0
        }, {
          type: '待发货',
          id: 4
        }, {
          type: '待收货',
          id: 1
        }, {
          type: '已完成',
          id: 2
        }, {
          type: '退款/退货',
          id: 3
        }],
        active: 0,
        type: 0,
        orderList1: [],
      };
    },
    onLoad(option) {
      console.log(option)
      this.active = Number(option.index)
      this.type = this.tabsItem[this.active].id
      this.getOrderList()
    },
    methods: {
      activeChaned(i, id) {
        this.active = i
        this.type = id
        this.getOrderList()
      },

      async getOrderList() {
        this.orderList1 = []
        const {
          mobile
        } = JSON.parse(uni.getStorageSync('userInfo'))

        // this.type = 2

        const {
          data: res
        } = await uni.$http.get(`order_user/${mobile}/${this.type}/`)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        this.orderList1 = res.lists
        console.log(this.orderList1)
        // uni.setStorageSync('orderList', JSON.stringify(this.orderList1))
      }
    }
  }
</script>

<style lang="scss">
  .orders-page {
    min-height: 100vh;
    background: #F6F6F6;
  }

  .tabs-box {
    display: flex;
    justify-content: space-between;
    padding: 24rpx 30rpx;
    background-color: #FFFFFF;

    .tabs-item {
      font-size: 32rpx;
      font-weight: 500;
      color: #8F99A7;

      &.active {
        color: #294D7C;
        font-weight: 700;
      }
    }
  }

  .order-component {
    padding: 20rpx 30rpx 20rpx;

    .order-box {
      padding: 0 30rpx;
      margin-bottom: 20rpx;
      background-color: #FFFFFF;
      border-radius: 8rpx;

      .order-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24rpx 0 10rpx;

        .id {
          font-size: 14px;
          font-weight: 500;
          color: #999999;
        }

        .state {
          font-size: 30rpx;
          font-weight: 500;
        }
      }
    }

    .goods {
      display: flex;
      padding-bottom: 30rpx;

      .pic {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180rpx;
        height: 180rpx;
        margin-right: 30rpx;
        background: #F0F0F0;
        border-radius: 6px;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10rpx 0;

        .title {
          font-size: 32rpx;
          font-weight: bold;
          color: #000104;
        }

        .intro {
          font-size: 28rpx;
          font-weight: 500;
          color: #C0C8D3;
        }

        .price {
          .price {
            float: left;
            font-size: 24rpx;
            font-weight: 500;
            color: #C0C8D3;

            text {
              font-size: 36rpx;
            }

          }

          .num {
            float: right;
            // font-size: 24rpx;
            font-weight: 500;
            color: #C0C8D3;
          }
        }
      }
    }

    .time-box {
      // display: flex;
      // justify-content: space-between;
      margin-bottom: 10px;
      font-size: 14px;
      color: #999999;

      >view {
        margin-bottom: 5px;
      }
    }

    .btns-box {
      display: flex;
      justify-content: flex-end;
      border-top: 1px dashed #DFDFDF;

      button:first-child {
        color: #294D7C;
        border-color: #294D7C;
        background-color: #FFFFFF;
      }

      button {
        width: 180rpx;
        // height: 30px;
        background: #294D7C;
        // margin: 0;
        margin: 30rpx;
        margin-right: 0;
        border-radius: 8rpx;
        font-size: 28rpx;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }
</style>
