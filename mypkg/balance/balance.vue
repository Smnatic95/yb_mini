<template>
  <view class="balance-page">
    <view class="balance-top">
      <view class="title">余额</view>
      <view class="num">
        <image src="/static/images/price.png"></image>
        <text>{{total}}</text>
      </view>
    </view>

    <!-- 待支付 已完成 已退款 -->
    <block v-for="(item,i) in balancelList" :key='i'>
      <!-- 充值 -->
      <view class="balance-item">
        <view class="top">
          <view class="title">
            <view class="type">{{item.order_goods?'消费':'充值'}}</view>
            <view class="time" v-if="item.give_money">充值金额：￥{{item.total_amount}}</view>
            <view class="time" v-if="item.give_money">赠送金额：￥{{item.give_money}}</view>
            <view class="time" v-if="item.coupon||item.coupon==0">优惠券：￥{{item.coupon}}</view>
            <view class="time" v-if="item.freight">邮费：￥{{item.freight}}</view>
            <view class="time">{{item.create_time}}</view>
            <view class="order">{{item.order_id}}</view>
          </view>
          <view class="num" v-if="!item.order_goods">+{{Number(item.total_amount)+Number(item.give_money)}}</view>
          <view class="num sub" v-else>-{{(Number(item.price)+Number(item.freight)-Number(item.coupon)).toFixed(2)}}
          </view>
        </view>

        <view class="goods" v-if="item.order_goods">
          <view class="goods-detail" v-if="item.isGoodsShow" v-for="(item2,i2) in item.order_goods" :key='i2'>
            <view class="goods-item">
              <view class="pic">
                <image :src="'https://7n.oripetlife.com/'+item2.image"></image>
              </view>
              <view class="title">{{item2.sku_name}}</view>
              <view class="price">￥{{item2.price}}</view>
              <view class="num">x{{item2.count}}</view>
            </view>
          </view>
          <view class="icon" @click='goodsChange(i)'>
            <uni-icons v-if="item.isGoodsShow" type="arrowup" size="14" color="#c0c8d3"></uni-icons>
            <uni-icons v-else type="arrowdown" size="14" color="#c0c8d3"></uni-icons>
          </view>
        </view>
      </view>
    </block>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        isGoodsShow: false,
        balancelList: [],
      };
    },
    computed: {
      total() {
        return JSON.parse(uni.getStorageSync('userInfo')).money_vip
      }
    },
    onLoad() {
      this.getBalancelList()
    },
    methods: {
      async getBalancelList() {
        this.balancelList = []
        const {
          mobile
        } = JSON.parse(uni.getStorageSync('userInfo'))
        // let url = `year_user/${mobile}/`
        // if (this.active == 0) url = `year_user/${mobile}/`
        // if (this.active == 1) url = `year_order/${mobile}/`
        const {
          data: res
        } = await uni.$http.get(`user_recharge/${mobile}/`)
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        res.lists.forEach(item => {
          if (item.order_goods) {
            item.isGoodsShow = false
          }
        })
        this.balancelList = res.lists

        console.log(this.balancelList)
      },

      goodsChange(i) {
        this.balancelList[i].isGoodsShow = !this.balancelList[i].isGoodsShow
      },
      gotoOrderDetail(type) {
        uni.navigateTo({
          url: '/pages/order-detail/order-detail?type=' + type
        })
      }

    }

  }
</script>

<style lang="scss">
  .balance-page {
    background-color: #f6f6f6;
    min-height: 100vh;
  }

  .balance-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120rpx;
    padding: 0 30rpx;
    margin-bottom: 20rpx;
    background: #FFFFFF;

    .title {
      font-size: 30rpx;
      font-weight: bold;
      color: #000104;

      .time {
        font-size: 24r2px;
        font-weight: 500;
        color: #C0C8D3;
      }
    }

    .num {
      display: flex;
      align-items: flex-end;
      font-size: 44rpx;
      font-weight: bold;
      color: #E0C699;

      image {
        width: 14rpx;
        height: 20rpx;
        margin: 0 10rpx 18rpx 0;
      }
    }
  }

  .balance-item {
    display: flex;
    flex-direction: column;
    padding: 0 30rpx;
    margin-bottom: 10rpx;
    background: #FFFFFF;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // height: 120rpx;
      padding: 10px 0;

      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #000104;

        .time {
          font-size: 24rpx;
          font-weight: 500;
          color: #C0C8D3;
        }

        .order {
          font-size: 28rpx;
          font-weight: 500;
          color: #8F99A7;
        }
      }

      .num {
        display: flex;
        align-items: center;
        font-size: 32rpx;
        font-weight: bold;
        color: #E0C699;

        &.sub {
          color: #80C5CD;
        }
      }
    }

    .goods {
      .goods-detail {
        padding-top: 20rpx;
        border-top: 1px solid #f6f6f6;

        .goods-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20rpx;

          .pic {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80rpx;
            height: 80rpx;
            margin-right: 28rpx;
            background-color: #f6f6f6;
            border-radius: 8rpx;

            image {
              width: 100%;
              height: 100%;
            }
          }

          .title {
            flex: 1;
            font-size: 30rpx;
            font-weight: 500;
            color: #8F99A7;
            display: -webkit-box;
            overflow: hidden;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
          }

          .price,
          .num {
            font-size: 28rpx;
            font-weight: 500;
            color: #80C5CD;
          }

          .price {
            padding: 0 16rpx;
          }
        }

      }

      .icon {
        text-align: center;
        border-top: 1px solid #f6f6f6;
      }

    }
  }
</style>
