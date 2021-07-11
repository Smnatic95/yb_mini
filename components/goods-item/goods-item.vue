<template>
  <view class="goods-item">
    <radio v-show="showRadio" :checked='goods.is_checked' color="tomato" style="transform:scale(0.7)"
      @click="radioClick(goods)" />
    <view class="goods">
      <view class="pic-box">
        <image :src="goods.goods_img" mode=""></image>
      </view>
      <view class="right">
        <view class="goods-info">
          <view class="goods-title">
            <text>{{goods.goods_name}}</text>
            <view class="icon" v-if="showClearBtn" @click="removeGoodsHandler(goods.goods_id)">
              <uni-icons type="closeempty" size="15" color=""></uni-icons>
            </view>
          </view>
          <view class="goods-intro">{{goods.goods_intro}}</view>
        </view>
        <view class="goods-price">
          <view class="price">
            ￥<text>{{goods.goods_price}}</text>
            <!-- <view class="price-ori">￥<text>{{}}</text></view> -->
          </view>
          <uni-number-box v-if="showNumBox" :min="1" :value='goods.goods_count' @change="numberChangeHandler">
          </uni-number-box>
          <vuew class="num" v-if="showNum">x{{goods.goods_count}}</vuew>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'

  export default {
    name: "goods-item",
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: true
      },
      showClearBtn: {
        type: Boolean,
        default: false
      },
      showNumBox: {
        type: Boolean,
        default: true
      },
      showNum: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {};
    },
    methods: {
      ...mapMutations('cart', ['updateGoodsCount', 'removeGoodsById']),

      radioClick(goods) {
        // console.log(goods)
        this.$emit('radio-click', {
          goods_id: goods.goods_id,
          is_checked: !goods.is_checked
        })
      },

      numberChangeHandler(val) {
        // console.log(val)
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: val
        })
      },

      removeGoodsHandler(id) {
        this.removeGoodsById(id)
      }



    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    align-items: center;
    // height: 200rpx;
    padding: 20rpx;
    // margin-bottom: 20rpx;
    background-color: #FFFFFF;
    border-radius: 4px;

    .goods {
      display: flex;
      width: 100%;

      .pic-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180rpx;
        height: 180rpx;
        // margin-left: 15rpx;
        margin: 0 15rpx;
        background: #F0F0F0;
        border-radius: 6px;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10rpx 0;

        .goods-title {
          display: flex;
          justify-content: space-between;
          font-size: 30rpx;
          font-weight: bold;
          color: #000104;

          .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            // margin-right: 10px;
            // margin-top: -10px;
            color: #a5a5a5;
            // background-color: #007AFF;
          }
        }

        .goods-intro {
          font-size: 24rpx;
          font-weight: 500;
          color: #C0C8D3;
        }

        .goods-price {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .price {
            font-size: 20rpx;
            font-weight: 500;
            color: tomato;

            text {
              font-size: 32rpx;
            }
          }

          .num {
            color: #C0C8D3;
          }
        }
      }
    }
  }
</style>
