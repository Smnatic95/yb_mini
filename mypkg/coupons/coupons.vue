<template>
  <view class="page">

    <view class="no-coupon" v-if="couponsList.length<=0">
      <image src="https://7n.oripetlife.com/no-coupon.png" mode="widthFix"></image>
    </view>

    <block v-else>
      <view class="pic">
        <image src="/static/images/bg1.png" mode=""></image>
      </view>
      <view class="scroll-item" v-for="(item,i) in couponsList" :key='item.coupon_id'>
        <view class="left">
          <view>￥<text>{{item.price}}</text></view>
          <view>满{{item.min_price}}可用</view>
        </view>
        <view class="right">
          <view>{{item.coupon_name}}</view>
          <view>不限时</view>
          <!-- <view v-else>不可用</view> -->
        </view>
      </view>
    </block>

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {};
    },
    computed: {
      ...mapState('cart', ['is_vip', 'couponsList']),
    },
    onLoad() {
      this.getCouponslList()
    },
    methods: {
      ...mapMutations('cart', ['updateCouponsList']),

      async getCouponslList() {
        const {
          mobile
        } = JSON.parse(uni.getStorageSync('userInfo'))
        const {
          data: res
        } = await uni.$http.get(`user_coupon/${mobile}/`)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        // console.log(res)
        let arr = res.lists
        if (res.lists.length > 0) {
          res.lists.forEach(item => {
            if (item.coupon_id == 1) { // 转介绍
              item.price = 30
              item.min_price = 100
            } else if (item.coupon_id == 2) { // 新客
              item.price = 10
              item.min_price = 10
            } else if (item.coupon_id == 3) { // 会员福利
              item.price = 10
              item.min_price = 60
            } else if (item.coupon_id == 4) { // 不发
              item.price = 50
              item.min_price = 50
            } else if (item.coupon_id == 5) { // 答题
              item.price = 10
              item.min_price = 60
            } else if (item.coupon_id == 6) { // 买一送一
              item.price = 0
              item.min_price = 0
            } else if (item.coupon_id == 7) { // 会员福利
              item.price = 20
              item.min_price = 300
            }
          })
        }
        arr = res.lists
        this.updateCouponsList(arr)
      },

    }

  }
</script>

<style lang="scss">
  .page {
    // padding-top: 10px;
    padding: 10px 10px 20px;
  }

  .no-coupon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 100px;

    // height: 80;
    image {
      width: 80%;
    }
  }

  .pic {
    width: 100%;
    height: 250rpx;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;

    image {
      width: 100%;
    }
  }

  .scroll-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    height: 180rpx;

    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 220rpx;
      height: 100%;
      text-align: center;
      font-weight: bold;
      color: #FFFFFF;
      font-size: 36rpx;

      view:nth-child(2) {
        font-size: 24rpx !important;
        font-weight: 400;
      }

      text {
        font-size: 60rpx;
      }
    }

    .right {
      margin-left: 20px;
      font-size: 28rpx;
      line-height: 40rpx;

      view:nth-child(2) {
        font-size: 24rpx !important;
        color: #ccc;
      }
    }

    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArIAAAC0CAMAAABfYT+GAAACB1BMVEUAAAD///////+/v4D////////fv2Dfv4D////////qv4D////ms3P////0yHr////qv4D////////////////////tyojuv4DuxYXqv4D////////wwn7tuXP////////twX7vvHX////twX7////////////////////uu3X////////////twX3twX/////////tu3TtwX/twoDtyIntyon////syYnuxIDuyYn////uwoD////tvHXtwH3////uwn/////////uw4D////tyIn////////tu3XtwH7twX/////////tw4HsyIrtw4DtyIr////////////twX7////swH7tu3X////////syIntw4H////////swoD////////////tu3XtwX7twX/twoDtw4HtyIn////////tu3Xtu3btvHbtvHftvXftvXjtvXntvXrtvnntvnrtvnvtv3rtv3vtv3ztv33twHztwH3twH7twX3twX7twX/twYDtwn/twoDtwoHtw4Dtw4Htw4LtxILtxIPtxYPtxYTtxYXtxoXtxobtx4btx4ftx4jtyIjtyIntyYntyYrxypTxypXxy5Xxy5bxzJfxzJjxzZjxzZnxzprxzpv02bP02rP02rT02rX027X027b03Lb03Lf56tX56tb569b569f57Nf57Nj///+ldXk6AAAAanRSTlMAAgMEBQcICAkLDA8UFBcXGBwgJCYnKywsMExQU1RWbG9vcXN3eYOFhoeHiIqLi4yOj4+Pj4+Pk5OTlpeXn5+go6m9v8DDx87Pz8/P0tPX19fb4OHj5ufn6/Hz8/P19/j5+vv7+/v7+/v+bYvYiQAAB4VJREFUeNrt3Qd7FGUUxfFREBv23lAsWKKiotgbdrErFqzYgM3GxKxszMoEEIyABJHYe+8f0iQkIey8I0mMYc//nvsVzu+5zzvvzNnNsqE5+eqHVg6Ozu6PmmfX2Hw4OjubZ2BH03wwPtv3zLbm2fp+8/SPzXujs6V5Nm9qmo3j0zc0t2XJufVvD2Kef3TpiaOZzrl29eD47N6tKrbv/jTZ5Q4bM6va5o6IvWtw9sVunXmxfa8emxJ71ConDZplBw9lev3gRLK6Yvvy81Jkz3XMqGnLslNX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) no-repeat;
    background-size: 100% 100%;
  }
</style>
