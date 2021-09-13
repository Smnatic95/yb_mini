<template>
  <view class="page">

    <!-- 切换地址 -->
    <view class="change-btn" v-if="is_public_address">
      <view :class="addressType==1?'active':''" @click='gotoAddress(1)'>个人</view>
      <view :class="addressType==2?'active':''" @click='gotoAddress(2)'>公益</view>
    </view>

    <!-- 地址 -->
    <view @click='gotoAddress'>
      <address-item v-if="user_checked_address.receiver" :address="user_checked_address"></address-item>
      <view class="add-address" v-else>+ 添加地址</view>
    </view>

    <!-- 商品列表 -->
    <block v-for="(item,i) in cart_list" :key='i'>
      <goods-item :goods="item" :is_vip="is_vip" v-show='item.is_checked' :showRadio="false" :showNumBox='false'
        :showNum='true'>
      </goods-item>
    </block>
    <view class="sub">
      <view>共{{checkedCount}}件</view>
      <view>小计:￥<text>{{is_vip?checkedGoodsAmount_vip:checkedGoodsAmount}}</text></view>
    </view>

    <!--选择支付方式-->
    <!--   <view class="payway_choose">
      <view class="title">
        选择支付方式
      </view>
      <view class="payway wxpay" @click="choosePayway('wx')">
        <view class="pull_left">
          微信支付
        </view>
        <view class="pull_right">
          <text class="iconfont icon-duihao" v-if="payway=='wx'"></text>
        </view>
      </view>
      <view class="payway banlance" @click="choosePayway('banlance')">
        <view class="pull_left">
          余额支付
        </view>
        <view class="pull_right">
          <view class="iconfont icon-duihao" v-if="payway=='banlance'"></view>
        </view>
      </view>
    </view> -->
    <!--选择支付方式-->
    <view class="payway_choose1">
      <view class="title">
        支付方式 :
      </view>

      <radio-group class="list_payway" @change="payWayChange">
        <label class="item_payway">
          <view>
            <radio value="wx" :checked="payway === 'wx'" />
          </view>
          <view>微信支付</view>
        </label>
        <label class="item_payway">
          <view>
            <radio value="banlance" :checked="payway === 'banlance'" />
          </view>
          <view>余额支付</view>
        </label>
      </radio-group>

    </view>

    <!-- 优惠券 -->
    <view class="coupons-box">
      <!-- <view class="item">
        <view class="title">小计</view>
        <view class="discount">￥ {{checkedGoodsAmount}}</view>
      </view> -->
      <view class="item">
        <view class="title">优惠券</view>
        <view class="discount" v-if="coupon!==0" @click="showCouponsPopup">-￥ {{coupon}}</view>
        <view class="else" v-else @click="showCouponsPopup">请选择<uni-icons type="arrowright" size="12" color="">
          </uni-icons>
        </view>
      </view>
      <view class="item">
        <view class="title">邮费</view>
        <view class="discount">￥ {{postage}}</view>
      </view>
    </view>

    <!-- 提交订单按钮 -->
    <view class="submit-box">
      <view class="container">
        <view class="price">
          合计:<text>￥{{totalPrice}}</text>
        </view>
        <view class="btn" @click="onSubmit">提交订单</view>
      </view>
    </view>

    <!-- 优惠券弹出层 -->
    <uni-popup ref="popup" type="bottom">
      <view class="top">优惠券</view>
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" v-if="couponsList.length>0">
        <view class="scroll-item" v-for="(item,i) in couponsList" :key='i' @click="couponChanged(item)">
          <view class="left">
            <view>￥<text>{{item.price}}</text></view>
            <view>满{{item.min_price}}可用</view>
          </view>
          <view class="right">
            <view>会员减10元优惠券</view>
            <view>不限时</view>
            <!-- <view v-else>不可用</view> -->
          </view>
        </view>
      </scroll-view>
      <view class="no-coupon" v-else>
        <image src="https://7n.oripetlife.com/no-coupon.png" mode="widthFix"></image>
      </view>
    </uni-popup>

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
    mapState: mapStateCart,
    mapMutations: mapMutationsCart
  } = createNamespacedHelpers('cart')
  const {
    mapState: mapStateAddress,
    mapMutations: mapMutationsAddress
  } = createNamespacedHelpers('address')

  export default {
    data() {
      return {
        addressType: 1, // 地址类型
        postage: 10,
        is_vip: '',
        coupon: 0,
        coupon_id: 0,
        user_checked_address: {}, // 收货地址
        payway: 'wx',
        paramGoods: null
      };
    },
    computed: {
      ...mapState('user', ['userInfo']),
      ...mapStateCart(['cart_list', 'couponsList', 'gift_list']),
      ...mapStateAddress(['address_list', 'is_public_address', 'default_address_id']),
      ...mapGettersCart(['checkedCount', 'checkedGoodsAmount', 'checkedGoodsAmount_vip']),

      // 合计
      totalPrice() {
        return (Number(this.is_vip ? this.checkedGoodsAmount_vip : this.checkedGoodsAmount) + Number(this.postage) -
          Number(this.coupon)).toFixed(2)
      },
    },
    onLoad(options) {
      if (options && options.goods) {
        this.paramGoods = JSON.parse(options.goods);
        console.log('参数', this.paramGoods);
      }
    },
    onShow() {
      console.log('onshow')
      uni.$http.get('user_gifts/').then(res => {
        this.updateGiftList(res.data.lists);
        this.addGift();
      })
      this.is_vip = JSON.parse(uni.getStorageSync('userInfo') || "{}").vip_active || false
      this.getCheckedAddress();
      this.couponChanged();
    },
    onUnload() {
      uni.removeStorageSync('user_checked_address')
      this.deleteGift()
    },
    methods: {
      ...mapMutationsAddress(['editCheckedAddress', ]),
      ...mapMutationsCart(['addGift', 'deleteGift', 'updateGiftList', 'clearCart', 'removeGoodsById', 'deleteGift']),
      ...mapMutations('user', ['updateUserInfo']),

      // 收货地址
      getCheckedAddress() {
        console.log('获取收获地址----');
        var checked_address_stroge = uni.getStorageSync('user_checked_address');
        if (checked_address_stroge) {
          this.user_checked_address = JSON.parse(checked_address_stroge);
        } else {
          this.user_checked_address = this.address_list.filter(x => x.address_id == this.default_address_id)[0];
        }
        if (this.user_checked_address) {
          this.countPosterPrice();
        }
      },

      choosePayway(val) {
        //不是会员且选择余额支付时
        if (!this.is_vip && val == 'banlance') {
          uni.showModal({
            title: '提示',
            content: '您还不是会员，无法使用余额支付！请先去开通后重试',
            cancelText: '暂不考虑',
            confirmText: '去开通',
            success(res) {
              if (res.confirm) {
                uni.navigateTo({
                  url: '../../mypkg/vip/vip'
                })
              }
            }
          })
          return
        }
        this.payway = val;
      },

      payWayChange(e) {
        this.choosePayway(e.detail.value);
      },
      // 展示优惠券弹出层
      showCouponsPopup() {
        this.$refs.popup.open('bottom')
      },
      // 切换优惠券
      couponChanged(item) {
        if (!item) {
          // 初始化
          const filterRes = this.couponsList.filter(item => item.min_price <= this.checkedGoodsAmount)
          if (filterRes.length == 0) return this.coupon = 0
          filterRes.forEach((item, i) => {
            if (item.price > this.coupon) {
              this.coupon = item.price
              this.coupon_id = item.coupon_id
            }
          })
        } else {
          // 切换
          if (this.checkedGoodsAmount >= item.min_price) {
            this.coupon = item.price;
            this.coupon_id = item.coupon_id;
            console.log(item)
            this.$refs.popup.close()
          } else {
            this.coupon = 0
            this.coupon_id = 0
            return uni.$showMsg(`商品总价小于${item.min_price}元`)
          }
        }
      },
      // 提交订单
      onSubmit() {
        if (!(this.user_checked_address && this.user_checked_address.address_id)) return uni.$showMsg('请选择收货地址！');
        const goods_list = []
        this.cart_list.filter(x => x.is_checked).forEach(x => {
          goods_list.push({
            id: Number(x.goods_id),
            price: x.price,
            market_price: x.market_price,
            num: x.goods_count,
            total_price: (this.is_vip ? x.market_price : x.price) * x.goods_count
          })
        })
        const form = {
          address_id: this.user_checked_address.address_id,
          coupon_price: this.coupon,
          type: this.coupon_id,
          posterPrice: this.postage,
          user_id: uni.getStorageSync('id'),
          parent_id: uni.getStorageSync('parent_id'),
          goods_list: goods_list
        }

        if (this.payway == 'wx') {
          this.payWX(form)
        } else if (this.payway == 'banlance') {
          this.payBanlance(form);
        }
      },
      //发起微信支付
      async payWX(form) {
        const {
          data: res
        } = await uni.$http.post('wx_order/', form);
        var res1 = await uni.$http.get('wx_payment/' + res.order_id + '/');
        const params = res1.data.params;
        const [err2, res2] = await uni.requestPayment({
          "timeStamp": String(params.timeStamp),
          "nonceStr": params.nonceStr,
          "package": "prepay_id=" + params.prepay_id,
          "signType": "MD5",
          "paySign": params.sign
        });
        // //支付失败
        // if (err2) {
        //   this.handlePayFail(form.goods_list);
        //   return;
        // }
        // //支付成功
        // if (res2) {
        //   this.handlePaySuccess(form.goods_list);
        //   return;
        // }
        console.log('微信支付结果', err2, res2);

        const {
          data: res3
        } = await uni.$http.get('wxeck_order/' + res.order_id + '/');

        uni.$showMsg(res3.msg);

        if (res3.code === 200) {

          setTimeout(() => {
            this.deletbuyedGoods(form.goods_list);
            uni.redirectTo({
              url: '../../subpkg/orders/orders?index=1'
            })
          }, 1500)

        } else if (res3.code === 400) {

          setTimeout(() => {
            this.deletbuyedGoods(form.goods_list);
            uni.redirectTo({
              url: '../../subpkg/orders/orders?index=0'
            })
          }, 1500)

        }

      },
      //发起余额支付
      async payBanlance(form) {
        const {
          data: res
        } = await uni.$http.post('mini_balance_payment/', form);
        //成功
        if (res.code === 200) {
          uni.$showMsg(res.msg);

          let userInfo = this.userInfo;
          userInfo.money_vip -= this.totalPrice;
          console.log(userInfo);
          this.updateUserInfo(userInfo);

          setTimeout(() => {
            this.deletbuyedGoods(form.goods_list);
            uni.redirectTo({
              url: '../../subpkg/orders/orders?index=1'
            })
          }, 1500);

          //失败
        } else if (res.code === 400) {
          uni.$showMsg(res.msg);
        }
      },
      //支付成功
      handlePaySuccess(goods_list) {
        uni.$showMsg('支付成功');
        setTimeout(() => {
          this.deletbuyedGoods(goods_list);
          uni.redirectTo({
            url: '../../subpkg/orders/orders?index=1'
          })
        }, 1500)
      },
      //支付失败
      handlePayFail(goods_list) {
        uni.$showMsg('支付失败，请去订单页重新支付');
        setTimeout(() => {
          this.deletbuyedGoods(goods_list);
          uni.redirectTo({
            url: '../../subpkg/orders/orders?index=0'
          })
        }, 1500)
      },
      //删除购买商品
      deletbuyedGoods(goods_list) {
        goods_list.forEach((goods) => {
          this.removeGoodsById(goods.id);
        });
      },
      // 计算邮费
      countPosterPrice() {
        console.log(this.cart_list.filter(x => x.is_checked))
        // console.log(this.user_checked_address)
        const province_id = this.user_checked_address.address[0].value - 0
        // console.log(province_id)

        // 新疆 西藏 1kg+15
        let arr1 = [650000, 540000]
        let area1 = arr1.some(item => item === province_id)
        // 甘肃 内蒙 宁夏 青海 貓砂+40
        let arr2 = [620000, 150000, 640000, 630000]
        let area2 = arr2.some(item => item === province_id)
        // 猫砂+30
        let arr3 = [230000, 220000, 210000, 520000, 460000, 450000, 530000]
        let area3 = arr3.some(item => item === province_id)


        // 猫砂
        let maosha = this.cart_list.filter(x => x.is_checked).some(item => item.type == 4)
        // 试吃
        let shichi = this.cart_list.filter(x => x.is_checked).some(item => item.type == 7 || item.type == 8)

        let price = 0
        if (area1) {
          // 新疆 西藏
          let sum_weight = 0
          this.cart_list.filter(x => x.is_checked).forEach(item => {
            sum_weight += (item.weight - 0) * item.goods_count
          })
          // console.log(sum_weight);
          sum_weight = Math.ceil(sum_weight)
          // console.log(sum_weight);
          price = sum_weight * 15
        } else {
          // console.log(this.cart_list.filter(x=>x.is_checked));
          let ms_num = 0
          this.cart_list.filter(x => x.is_checked).forEach(item => {
            if (item.type == 4) ms_num = item.goods_count
          })
          if (area2) {
            if (province_id == 150000) {
              var sum = 0
              this.cart_list.filter(x => x.is_checked).forEach(item => {
                sum += item.goods_count
              })
              if (this.totalPrice < 60 && sum < 4) {
                console.log(this.totalPrice)
                price = 10
              } else if ((this.totalPrice - 30) < 60 && sum < 4) {
                // 转介绍优惠券
                if (this.payForm.coupon === 1) {
                  price = 10
                } else if (!this.payForm.coupon) {
                  price = 0
                }
              }
            }
          }
          // if (shichi) {
          //   // 试吃
          //   // 是否有其它产品
          //   let flag = !this.cart_list.some(item => item.type != 7 && item.type != 8)
          //   if (flag) {
          //     price = 10
          //     var sum = 0
          //     this.cart_list.forEach(item => {
          //       sum += item.goods_count
          //     })
          //     if (sum >= 4) price = 0
          //   }
          // }
        }
        this.postage = price
      },

      gotoAddress(type) {
        if (type === 1) {
          uni.navigateTo({
            url: '/mypkg/address/address?from=settle&type=' + this.addressType
          })
          this.addressType = 2
        } else {
          uni.navigateTo({
            url: '/mypkg/address/address?from=settle&type=' + this.addressType
          })
          this.addressType = 1
        }
      },

    }
  }
</script>

<style lang="scss">
  .page {
    padding: 10px 0 100px;

    >button {
      margin: 0 10px 10px;
      background-color: #FFFFFF;

      &::after {
        border: 0;
      }
    }
  }

  .payway_choose1 {
    margin: 10px;
    padding-bottom: 10px;
    background-color: #FFFFFF;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    padding: 30rpx 20rpx;
    align-items: center;

    .title {
      margin-right: 20rpx;
    }

    .list_payway {
      display: flex;

      .item_payway {
        display: flex;
        align-items: center;
        margin-right: 10rpx;

        radio {
          transform: scale(.6);
        }
      }
    }

  }

  .payway_choose {
    margin: 10px;
    padding-bottom: 10px;
    background-color: #FFFFFF;
    border-radius: 5px;
    overflow: hidden;

    .title {
      font-size: 32rpx;
      text-align: center;
      margin-top: 20rpx;
    }

    .payway {
      display: flex;
      height: 80rpx;
      line-height: 80rpx;
      justify-content: space-between;
      padding: 10px 15px 0;
      box-sizing: border-box;

      .pull_left {
        font-size: 26rpx;
      }

      .pull_right {
        .iconfont {
          font-size: 30rpx;
          font-weight: bold;
        }
      }
    }
  }

  .change-btn {
    display: flex;
    width: 88px;
    font-size: 14px;
    margin: 0 0 10px 10px;
    border: 1px solid #C0C8D3;
    border-radius: 3px;

    >view {
      padding: 6rpx 16rpx;
      color: #C0C8D3;

      &.active {
        color: #FFFFFF;
        background-color: #C0C8D3;
      }
    }
  }

  .radius {
    border-radius: 5px !important;
    overflow: hidden;
  }

  .address-item {
    margin: 0 10px 10px !important;
  }

  .add-address {
    text-align: center;
    padding: 20px;
    margin: 0 10px 10px;
    color: #666;
    background-color: #FFFFFF;
    border-radius: 5px;
  }

  .goods-item {
    margin: 0 10px;
    // border-top: 1px solid #eee;
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
        font-size: 12px;
        color: tomato;
      }

      .else {
        flex: 1;
        text-align: right;
        font-size: 12px;
        color: #ccc;
      }

    }
  }

  .submit-box {
    position: fixed;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    width: 100%;
    background-color: #FFFFFF;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding: 0 15px;
      box-sizing: border-box;
      // background-color: #007AFF;

      .count {
        font-size: 14px;
        color: #C0C8D3;
      }

      .price {
        display: flex;
        align-items: center;
        font-size: 15px;

        text {
          font-size: 18px;
          color: tomato;
        }
      }

      .btn {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 10px;
        color: #FFFFFF;
        background-color: tomato;
        border-radius: 20px;
      }
    }
  }

  // 优惠券弹出层
  .vue-ref {
    background-color: #fff;
    height: 450px;
    // padding: 0 10px;
    border-radius: 10px 10px 0 0;
    overflow: hidden;

    .top {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-weight: bold;
      background-color: #FFFFFF;
    }

    scroll-view,
    .no-coupon {
      height: 350px;
    }

    scroll-view {
      width: 100%;
      padding: 20rpx 20rpx 0;
      background-color: #f5f5f5;
      box-sizing: border-box;

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

    }

    .no-coupon {
      display: flex;
      justify-content: center;
      align-items: center;

      // line-height: 400px;
      // text-align: center;
      image {
        width: 60%;
      }
    }
  }
</style>
