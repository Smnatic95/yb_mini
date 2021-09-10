<template>
  <view class="balance-page">

    <view class="balance-top">
      <view class="title">余额</view>
      <view class="num">
        <image src="/static/images/price.png"></image>
        <text>{{total}}</text>
      </view>
    </view>

    <view class="tabs">
      <view class="tabitem" :class="{active:active_tab==0}" @click="tabClick(0)">
        全部
      </view>
      <view class="tabitem" :class="{active:active_tab==1}" @click="tabClick(1)">
        充值
      </view>
      <view class="tabitem" :class="{active:active_tab==2}" @click="tabClick(2)">
        消费
      </view>
    </view>

    <!-- 待支付 已完成 已退款 -->
    <block v-for="(item,i) in balancelList1" :key='i'>
      <!-- 充值 -->
      <view class="balance-item">
        <view class="top">

          <view class="title">

            <view class="type">{{ !item.total_amount?'消费':item.isInit?'初始数据':'充值'}}</view>

            <view class="info-item time" v-if="item.give_money">充值金额：￥{{item.total_amount}}</view>

            <view class="info-item time" v-if="item.give_money">赠送金额：￥{{item.give_money}}</view>

            <view class="info-item time" v-if="item.coupon||item.coupon==0">优惠券：￥{{item.coupon}}</view>

            <view class="info-item time" v-if="item.freight">邮费：￥{{item.freight}}</view>

            <view class="info-item time"> 创建时间： {{item.create_time}}</view>

            <view class="info-item order">订单编号： {{item.order_id}}</view>

          </view>

          <view class="num" v-if="!item.order_goods">
            +{{ (Number(item.total_amount)+Number(item.give_money)) | tofixed2 }}</view>
          <view class="num sub" v-else>-
            {{ ( Number(item.price)+Number(item.freight)-Number(item.coupon) ) | tofixed2 }}
          </view>
        </view>

        <view class="goods" v-if="item.order_goods">

          <view class="goods-list" :class="{active:item.isGoodsShow}">
            <view class="goods-detail" v-for="(item2,i2) in item.order_goods" :key='i2'>
              <view class="goods-item">
                <view class="pic">
                  <image :src="'https://7n.oripetlife.com/'+item2.image"></image>
                </view>
                <view class="title">{{item2.sku_name}}</view>
                <view class="price">￥{{item2.price}}</view>
                <view class="num">x{{item2.count}}</view>
              </view>
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
        active_tab: 0
      };
    },
    computed: {
      total() {
        return JSON.parse(uni.getStorageSync('userInfo')).money_vip
      },
      balancelList1() {
        if (this.active_tab == 0) {
          return this.balancelList
        }

        if (this.active_tab == 1) {
          return this.balancelList.filter((item) => {
            return item.total_amount
          })
        }

        if (this.active_tab == 2) {
          return this.balancelList.filter((item) => {
            return !item.total_amount
          })
        }
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
        } = JSON.parse(uni.getStorageSync('userInfo'));
        const {
          data: res
        } = await uni.$http.get(`user_recharge/${mobile}/`)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        res.lists = res.lists || [];
        res.lists.forEach(item => {
          if (item.order_goods) {
            item.isGoodsShow = false
          }
        })
        res.lists.forEach((item) => {
          let nbReg = /\d/g;
          item.isInit = Boolean(Number(item.create_time.match(nbReg).join('')) < Number(20210202000000));
        })
        this.balancelList = res.lists;
        console.log(this.balancelList)
      },

      goodsChange(i) {
        this.balancelList1[i].isGoodsShow = !this.balancelList1[i].isGoodsShow
      },

      gotoOrderDetail(type) {
        uni.navigateTo({
          url: '/pages/order-detail/order-detail?type=' + type
        })
      },

      tabClick(index) {
        this.active_tab = index;
      }

    }

  }
</script>

<style lang="scss">
  .tabs {
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-top: 30rpx;
    border-bottom: 1px solid #eee;
    justify-content: space-around;

    .tabitem {
      height: 100rpx;
      line-height: 100rpx;
      box-sizing: border-box;
      font-weight: 500;

      &.active {
        color: #2A4E7D;
        font-weight: 600;
        border-bottom: 2px solid #2A4E7D;
      }
    }
  }

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
      padding: 10px 0;

      .type {
        font-size: 34rpx;
        font-weight: bold;
        color: #000104;
        padding-bottom: 15rpx;
      }

      .info-item {
        font-size: 26rpx;
        font-weight: 500;
        color: #555;
        height: 50rpx;
        line-height: 50rpx;
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

      .goods-list {
        transition: all .3s ease-out;
        max-height: 0;
        overflow: auto;

        &.active {
          max-height: 400px;
        }
        
        &::-webkit-scrollbar{
          display: none;
        }


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

      }

      .icon {
        text-align: center;
        border-top: 1px solid #f6f6f6;
      }

    }
  }
</style>
