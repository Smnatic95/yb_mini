<template>
  <view class="page">

    <!-- 充值订单 -->
    <block v-if="type==1">
      <view class="coupons-box">
        <view class="item">
          <view class="title">充值金额</view>
          <view class="discount">￥500</view>
        </view>
        <view class="item">
          <view class="title">赠送金额</view>
          <view class="discount">￥500</view>
        </view>
        <view class="item">
          <view class="title">订单号</view>
          <view class="else">20210629100150000008407</view>
        </view>
      </view>
    </block>

    <!-- 消费订单 -->
    <block v-else>
      <address-item :address="address"></address-item>
      <!-- 商品列表 -->
      <block v-for="(item,i) in cart_list" :key='i'>
        <goods-item :goods="item" v-show='item.is_checked' :showRadio="false" :showNumBox='false'></goods-item>
      </block>
      <view class="sub">
        <view>共{{checkedCount}}件</view>
        <view>小计:￥<text>{{checkedGoodsAmount}}</text></view>
      </view>

      <!-- 优惠券 -->
      <view class="coupons-box">
        <view class="item">
          <view class="title">优惠券</view>
          <view class="discount" v-if="coupon!==0">-￥ {{coupon}}</view>

        </view>
        <view class="item">
          <view class="title">邮费</view>
          <view class="discount">￥ {{postage}}</view>
        </view>
      </view>

      <view class="coupons-box">
        <view class="item">
          <view class="title">实际支付</view>
          <view class="discount">￥ {{coupon}}</view>
        </view>
        <view class="item">
          <view class="title">订单号</view>
          <view class="else">20210629100150000008407</view>
        </view>
      </view>

    </block>

  </view>
</template>

<script>
  import {
    mapState,
    mapGetters,
    mapMutations,
    createNamespacedHelpers
  } from 'vuex'
  const {
    mapGetters: mapGettersCart,
    mapState: mapStateCart
  } = createNamespacedHelpers('cart')
  const {
    mapGetters: mapGettersAddress,
    mapState: mapStateAddress
  } = createNamespacedHelpers('address')

  export default {
    data() {
      return {
        type: 1,
        coupon: 30,
        postage: 10,
        address: {
          receiver: '222',
          mobile: '17722222222',
          area: ['1-0', '1-2', '111'],
          add_str: '22222河南省郑州市高新区科学大道西四环万科城三期河南省郑州市高新区科学大道西四环万科城三期222222',
          is_default: true
        },
      };
    },
    onLoad(option) {
      this.type = option.type
      // uni.setNavigationBarTitle({
      //   title: option.type == 1 ? '充值订单' : '消费订单'
      // })
    },
    computed: {
      ...mapStateCart(['cart_list']),
      ...mapStateAddress(['address_list']),
      ...mapGettersCart(['checkedCount', 'checkedGoodsAmount']),
    }
  }
</script>

<style lang="scss">
  .page {
    padding-top: 15px;
  }

  .address-item {
    margin: 0 10px 10px !important;
  }

  .goods-item {
    margin: 0 10px;
  }

  .sub {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin: 0 10px 0;
    padding: 20px 10px 10px;
    font-size: 12px;

    background-color: #FFFFFF;
    border-radius: 5px;

    view {
      margin-left: 10px;

      text {
        font-size: 14px;
        color: tomato;
      }
    }
  }

  .coupons-box {
    margin: 10px;
    padding-bottom: 10px;
    background-color: #FFFFFF;
    border-radius: 5px;
    overflow: hidden;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px 0;
      background-color: #FFFFFF;

      .discount {
        flex: 1;
        text-align: right;
        font-size: 24rpx;
        color: tomato;
      }

      .else {
        flex: 1;
        text-align: right;
        font-size: 24rpx;
        color: #ccc;
      }
    }
  }
</style>
