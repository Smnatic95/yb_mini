<template>
  <view class="goods-box">
    <block v-for='item in goodsList' :key='item.id'>
      <view class="goods-item">
        <view class="pic" @click="gotoGoodsDetail(item)">
          <image :src="'https://7n.oripetlife.com/'+item.img" mode=""></image>
        </view>
        <view class="text">
          <view class="title">{{item.name}}</view>
          <view class="intro">简介简介简介简介</view>
          <view class="price-col">
            <!-- <text class="icon">￥</text> -->
            <image src="https://7n.oripetlife.com/huiyuanjia.png" mode=""></image>
            <text class="price">{{item.market_price}}</text>
            <!-- <image src="https://7n.oripetlife.com/huiyuanjia.png" mode=""></image> -->
            <text class="price-dis">￥<text>{{item.price}}</text></text>

            <view class="cart" v-if="item.stock>0" @click="handleAddCart(item)">
              <uni-icons type="cart" size="14" color="#fff"></uni-icons>
            </view>
            <view class="out" v-else>售空</view>

          </view>
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
    props: {
      goodsList: {
        type: Array,
      }
    },
    name: "home-goodsitem",
    data() {
      return {};
    },
    methods: {
      ...mapMutations('cart', ['addToCart']),

      // 跳转到商品详情页面
      gotoGoodsDetail(item) {
        console.log(item)
        const goods_id = item.id
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?id=${item.id}&goods_stock=${item.stock}&goods_img=${item.img}&weight=${item.weight}`,
        })
      },

      // 点击加入购物车
      handleAddCart(item) {
        console.log(item)
        const goods = {
          goods_id: item.id,
          goods_name: item.name,
          goods_intro: item.introduction,
          goods_img: 'https://7n.oripetlife.com/' + item.img,
          // goods_price: '179.00',
          market_price: item.market_price,
          price: item.price,
          goods_count: 1,
          weight:item.weight,
          is_checked: true,
        }
        this.addToCart(goods)
        uni.$showMsg("商品添加成功~")
      }

    }
  }
</script>

<style lang="scss">
  // 商品列表
  .goods-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // width: 100%;
    padding: 0 15px;
    background-color: #FFFFFF;

    .goods-item {
      width: 336rpx;
      margin-bottom: 26px;
      // padding: 10rpx;
      // margin: 10rpx;

      .pic {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 336rpx;
        height: 336rpx;
        background: #F6F6F6;
        border-radius: 2px;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        .title {
          padding: 14rpx 0 4rpx;
          font-size: 30rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: left !important;
          font-family: PingFang SC;
          font-weight: bold;
          color: #000104;
        }

        .intro {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #C0C8D3;
        }

        .price-col {
          .icon {
            font-size: 20rpx;
            font-weight: bold;
            color: #294D7C;
          }

          .price {
            font-size: 34rpx;
            font-family: DIN;
            font-weight: bold;
            color: #294D7C;
          }

          image {
            // margin-left: 6rpx;
            margin-right: 6rpx;
            width: 46rpx;
            height: 28rpx;
          }

          .price-dis {
            margin-left: 10rpx;
            font-size: 12px;
            font-family: DIN;
            font-weight: 500;
            color: #C0C8D3;

            text {
              text-decoration: line-through
            }
          }

          .cart {
            float: right;
            display: inline-block;
            width: 42rpx;
            height: 42rpx;
            text-align: center;
            margin-right: 10rpx;
            background-color: #294D7C;
            border-radius: 50%;
            overflow: hidden;
            z-index: 10;
          }

          .out {
            float: right;
            display: inline-block;
            text-align: center;
            font-size: 12px;
            color: #FFFFFF;
            margin-right: 10rpx;
            margin-top: 2px;
            padding: 5rpx 10rpx;
            background-color: tomato;
            border-radius: 21rpx;
          }
        }
      }
    }
  }
</style>
