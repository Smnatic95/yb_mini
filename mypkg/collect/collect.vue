<template>
  <view class="page">

    <view class="pic-box">
      <image src="/static/images/bg1.png" mode="widthFix"></image>
    </view>

    <view class="goods-item" v-for="item in collectList" :key='item.id'>
      <view class="goods-pic" @click="gotoGoodsDetail(item)">
        <image :src="'https://7n.oripetlife.com/'+item.img"></image>
      </view>
      <view class="goods-info"  @click="gotoGoodsDetail(item)">
        <view class="goods-title">
          <view class="title">{{item.name}}</view>
          <view class="icon" @click="collectChanged(item.id)">
            <!-- <image v-if="!is_collect" src="../../static/images/shoucang.png"></image> -->
            <image src="../../static/images/shoucang-active.png"></image>
          </view>
        </view>
        <view class="goods-price">
          <view class="price">
            <image class="icon" src="https://7n.oripetlife.com/huiyuanjia.png"></image>
            <text style="font-size: 12px;"></text>{{item.market_price}}
            <text class="price-dis">￥<text>{{item.price}}</text></text>
          </view>
          <!--  <view class="cart" v-if="item.stock>0" @click="addCart(1)">
            <uni-icons type="cart" size="14" color="#fff"></uni-icons>
          </view>
          <view class="out" v-else>售空12</view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        // collectList: [], // 收藏列表
      };
    },
    onLoad() {
      this.getCollectList()
    },
    computed: {
      ...mapState('user', ['collectList']),
    },
    methods: {
      ...mapMutations('user', ['updateCollect', 'deleteCollect']),

      // 热门榜单
      async getCollectList() {
        const mobile = JSON.parse(uni.getStorageSync('userInfo')).mobile
        const {
          data: res
        } = await uni.$http.get(`user_collect_list/${mobile}/`)

        this.suggestList = []
        let collectL_list = res.collect_list

        for (let i = 0; i < collectL_list.length; i++) {
          if (collectL_list[i]['id'] === 32 || collectL_list[i]['id'] === 33 || collectL_list[i]['id'] === 34) {
            collectL_list[i]['market_price'] = String((Number(collectL_list[i]['market_price']) * 4).toFixed(2))
            collectL_list[i]['price'] = String((Number(collectL_list[i]['price']) * 4).toFixed(2))
          }
        }
        if (res.code !== 200) return uni.$showMsg(res.msg)
        this.updateCollect(collectL_list)
      },

      // 点击收藏
      async collectChanged(id) {
        const mobile = JSON.parse(uni.getStorageSync('userInfo')).mobile
        const collect_list = {
          phone_id: mobile,
          sku_id: id
        }
        var {
          data: res
        } = await uni.$http.delete(`user_collect/`, {
          collect_list
        })
        if (res.code !== 200) return uni.$showMsg(res.msg)
        uni.$showMsg(res.msg)
        this.deleteCollect(id)
      },

      // 跳转商品详情页面
      gotoGoodsDetail(item) {
        console.log(item)
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?id=${item.id}&goods_stock=${item.stock}&weight=${item.weight}`,
        })
      },

    }
  }
</script>

<style lang="scss">
  .page {
    padding-top: 10px;
    padding-bottom: 50px;
  }

  .pic-box {
    height: 150px;
    margin: 0 10px 10px;
    border-radius: 10px;
    overflow: hidden;

    image {
      width: 100%;
    }
  }

  .goods-item {
    display: flex;
    padding: 10px;
    margin: 0 10px 10px;
    background-color: #FFFFFF;
    border-radius: 8px;
    overflow: hidden;


    .goods-pic {
      width: 75px;
      height: 75px;
      margin-right: 10px;
      background-color: #F6F6F6;
      border-radius: 10px;
      overflow: hidden;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .goods-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px 0;

      .goods-title {
        display: flex !important;
        justify-content: space-between;
        font-size: 15px;
        // font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        .title {
          flex: 1;
        }

        .icon {
          width: 20px;
          height: 20px;

          margin: 0 8px 0 5px;

          image {
            width: 100%;
            height: 100%;
          }
        }
      }

      .goods-price {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: 18px;
        color: #294D7C;

        .cart {
          // float: right;
          display: inline-block;
          width: 42rpx;
          height: 42rpx;
          line-height: 42rpx;
          text-align: center;
          font-weight: 400;
          margin-right: 10rpx;
          // background-color: #294D7C;
          border-radius: 50%;
          overflow: hidden;

          image {
            width: 100%;
            height: 100%;
          }
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

        .icon {
          // margin-top: 20px;
          // margin-left: 5rpx;
          margin-right: 2px;
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
      }
    }

  }
</style>
