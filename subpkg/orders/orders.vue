<template>
  <view class="orders-page">
    <view class="tabs-box" scroll-x="true" @scroll="scroll" scroll-left="0">
      <view :class="['tabs-item',active==i? 'active':'']" v-for="(item,i) in tabsItem" :key='i'
        @click="activeChaned(i,item.id)">{{item.type}}</view>
    </view>

    <view class="order-component">
      <view class="order-box" v-if="orderList1&&orderList1.length" v-for="item in orderList1" :key='item.order_id'>
        <!-- 订单号 -->
        <view class="order-info">
          <view class="id">订单号：{{item.order_id}}</view>
          <view class="state">
            <text style="color: #80C5CD;" v-show="item.status==0">待支付</text>
            <text style="color: #80C5CD;" v-show="item.status==1&&!item.tracking_number">待发货</text>
            <text style="color: #80C5CD;" v-show="item.status==1&&item.tracking_number">待收货</text>
            <text style="color: #FFA424;" v-show="item.status==2">已完成</text>
            <text style="color: #FFA424;" v-show="item.status==3">退款中</text>
            <text style="color: #FFA424;" v-show="item.status==0&&item.tracking_number">未发货</text>
          </view>
        </view>
        <view class="time-box">
          <view class="price">优惠券：{{item.coupon}}</view>
          <view class="price">邮费：￥{{item.freight}}</view>
          <view class="price">实付总价：￥{{(Number(item.price)+Number(item.freight)-Number(item.coupon)).toFixed(2)}}</view>
          <view class="time">创建时间：{{item.create_time}}</view>

          <view class="tracking_number" v-if="item.tracking_number">
            物流单号：{{item.tracking_number}} <text class="copy" @click="copyTrackingNumber(item.tracking_number)">复制</text>
          </view>

        </view>
        <!-- 商品详情 -->
        <view class="goods" v-for="(item2,i2) in item.order_goods" :key='i2'>
          <view class="pic">
            <image :src="'https://7n.oripetlife.com/'+item2.image" mode=""></image>
          </view>
          <view class="text">
            <view>
              <view class="title">{{item2.sku_name}}</view>
            </view>
            <view class="price">
              <view class="price">￥<text>{{item2.price}}</text></view>
              <text class="num">x {{item2.count}}</text>
            </view>
          </view>
        </view>
        <!--订单按钮-->
        <view class="btns-box">
          <!-- <button v-if="item.tracking_number">查看物流</button> -->
          <button @click="gotoPay(item)" v-if="item.status==0">去支付</button>
          <button @click="confirmG(item)" v-if="item.status==1&&item.tracking_number">确认收货</button>
        </view>
      </view>

      <view class="box_noOrder" v-if="orderList1&&!orderList1.length">
        <image class="img_toa" src="/static/images/noOrder.png" mode="scaleToFill"></image>
        <view class="toa">
          您还没有相关订单
        </view>
        <view class="subtoa">
          可以去看看有什么想买的
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
          id: 1
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
        active: null,
        type: 0,
        orderList1: null,
      };
    },
    onLoad(option) {
      this.active = Number(option.index)
      this.type = this.tabsItem[this.active].id;
      this.getOrderList()
    },
    methods: {
      activeChaned(i, id) {
        this.active = i
        this.type = id
        this.getOrderList()
      },
      async getOrderList() {
        this.orderList1 = null;
        const {
          mobile
        } = JSON.parse(uni.getStorageSync('userInfo'))
        const {
          data: res
        } = await uni.$http.get(`order_user/${mobile}/${this.type}/`)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        res.lists = res.lists || [];
        //待发货
        if (this.active == 1) {
          res.lists = res.lists.filter(item => !item.tracking_number)
        }
        //待收货
        if (this.active == 2) {
          res.lists = res.lists.filter(item => item.tracking_number)
        }

        res.lists = res.lists.sort(function(a, b) {
          return new Date(b.create_time).getTime() - new Date(a.create_time).getTime()
        })

        console.log(res);
        this.orderList1 = res.lists
      },
      async gotoPay(item) {
        //获取微信支付参数
        var res1 = await uni.$http.get('wx_payment/' + item.order_id + '/');
        const params = res1.data.params;
        console.log(params)
        //吊起微信支付
        const [err2, res2] = await uni.requestPayment({
          "timeStamp": String(params.timeStamp),
          "nonceStr": params.nonceStr,
          "package": "prepay_id=" + params.prepay_id,
          "signType": "MD5",
          "paySign": params.sign
        })
        console.log('微信支付结果', err2, res2);
        const {
          data: res3
        } = await uni.$http.get('wxeck_order/' + item.order_id + '/');
        uni.$showMsg(res3.msg);
        if (res3.code === 200) {
          this.active = 1;
          this.type = 1;
          this.getOrderList();
        } else if (res3.code === 400) {
          console.log('支付失败');
        }
      },
      copyTrackingNumber(data) {
        uni.setClipboardData({
          data,
          success() {
            uni.$showMsg('物流单号复制成功');
          }
        })
      },
      async confirmG(order) {
        const {
          data: res
        } = await uni.$http.get('order_true/' + order.order_id + '/');
        uni.$showMsg(res.msg);
        if (res.code == 200) {
          this.active = 3;
          this.type = 2;
          this.getOrderList();
        }
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
    height: 70rpx;
    line-height: 70rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 30rpx;
    background-color: #FFFFFF;
    z-index: 999;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;

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
    height: calc(100vh - 70rpx);
    overflow: auto;
    box-sizing: border-box;
    padding: 20rpx 30rpx 20rpx;

    .box_noOrder {
      margin-top: 60rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .img_toa {
        width: 200rpx;
        height: 200rpx;
      }

      .toa {
        font-size: 30rpx;
        margin-top: 20rpx;
      }

      .subtoa {
        font-size: 24rpx;
        margin-top: 20rpx;
        color: gray;
      }
    }

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
            float: right;;
            font-weight: 500;
            color: #C0C8D3;
          }
        }
      }
    }

    .time-box {
      margin-bottom: 10px;
      font-size: 14px;
      color: #999999;

      .tracking_number {
        display: flex;

        .copy {
          color: #DC4B3E;
          margin-left: 20rpx;

        }
      }

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
