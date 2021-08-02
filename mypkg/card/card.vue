<template>
  <view class="page">

    <view class="tabs-box" scroll-x="true" @scroll="scroll" scroll-left="0">
      <view :class="['tabs-item',active==i? 'active':'']" v-for="(item,i) in tabsItem" :key='i'
        @click="activeChaned(i)">{{item}}</view>
    </view>

    <view class="card-item" v-for="(item,i) in cardList" :key='i'>
      <block v-if="active==0">
        <view class="card">
          <view class="title">{{item.title}}</view>
          <view class="num">剩余次数<view class="num">{{item.surplus_count}}</view>
          </view>
        </view>
        <view class="record-box">
          <view class="record" v-if="item.isShowDetail">
            <view class="record-item" v-for="(item2,i2) in item.order_goods" :key='i2'>
              <view class="top">
                <view class="left">
                  <!-- <view class="time">20210629100150000008407</view> -->
                  <view class="type">{{item2.order_id}}</view>
                  <view class="time">{{item2.create_time}}</view>
                  <view class="price">￥{{item2.price}}</view>
                </view>
                <view class="right">
                  <view class="add">+{{item2.count}}</view>
                  <!-- <view class="sub">-1</view> -->
                </view>
              </view>
            </view>
          </view>

          <view class="icon" @click='iconClick(i)'>
            <uni-icons v-if="item.isShowDetail" type="arrowup" size="20" color="#c0c8d3"></uni-icons>
            <uni-icons v-else type="arrowdown" size="20" color="#c0c8d3"></uni-icons>
          </view>
        </view>
      </block>
      <block v-else>
        <view class="record-box">
          <view class="record">
            <view class="record-item">
              <view class="top">
                <view class="left">
                  <view class="type">订单号：{{item.order_id}}</view>
                  <view class="time">创建时间：{{item.create_time}}</view>
                  <view class="time">快递单号：{{item.tracking_number}}</view>
                  <view class="time">邮费：{{item.freight}}</view>
                  <!-- <view class="price sub">￥0</view> -->
                </view>
                <view class="right">
                  <view class="price sub">￥{{item.freight}}</view>
                  <!-- <text class="sub">{{item.count}}</text> -->
                </view>
              </view>
              <view class="goods-item" v-for="(item2,i2) in item.order_goods" :key='i2'>
                <view class="pic">
                  <image v-if="item2.image" :src="'https://7n.oripetlife.com/'+item2.image"></image>
                </view>
                <view class="title">{{item2.sku_name}}</view>
                <!-- <view class="price">￥0</view> -->
                <view class="num">x{{item2.count}}</view>
              </view>
            </view>
          </view>

          <!--   <view class="icon" @click='iconClick(i)'>
            <uni-icons v-if="item.isShowDetail" type="arrowup" size="14" color="#c0c8d3"></uni-icons>
            <uni-icons v-else type="arrowdown" size="" color="#c0c8d3"></uni-icons>
          </view> -->
        </view>

      </block>
    </view>


  </view>
</template>

<script>
  export default {
    data() {
      return {
        tabsItem: ['购买', '消费'],
        active: 0,
        isShowDetail: true,
        cardList: [],
      };
    },
    onLoad() {
      this.getCardList()
    },
    methods: {
      activeChaned(i) {
        this.active = i
        console.log(this.active)
        // this.type = id
        this.getCardList()
      },

      async getCardList() {
        this.cardList = []
        const {
          mobile
        } = JSON.parse(uni.getStorageSync('userInfo'))
        let url = `year_user/${mobile}/`
        if (this.active == 0) url = `year_user/${mobile}/`
        if (this.active == 1) url = `year_order/${mobile}/`
        const {
          data: res
        } = await uni.$http.get(url)
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        if (this.active == 0) {
          res.lists.forEach(item => {
            item.isShowDetail = false
          })
        }
        this.cardList = res.lists
        console.log(this.cardList)
      },



      iconClick(i) {
        this.cardList[i].isShowDetail = !this.cardList[i].isShowDetail
      },

    }
  }
</script>

<style lang="scss">
  .page {
    // padding-top: 20rpx;
  }

  .tabs-box {
    display: flex;
    justify-content: space-around;
    padding: 24rpx 30rpx;
    margin-bottom: 10px;
    background-color: #FFFFFF;

    .tabs-item {
      flex: 1;
      text-align: center;
      font-size: 32rpx;
      font-weight: 500;
      color: #8F99A7;

      &.active {
        color: #294D7C;
        font-weight: 700;
      }
    }
  }

  .card-item {
    display: flex;
    flex-direction: column;
    padding: 0 30rpx;
    margin-bottom: 20rpx;
    background: #FFFFFF;

    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 120rpx;

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
        align-items: center;
        font-size: 24rpx;
        // font-weight: bold;
        // color: #FFA424;
        color: #666666;

        &.sub {
          color: #80C5CD;
        }

        .num {
          padding-left: 8px;
          font-size: 32rpx !important;
          font-weight: bold;
          color: #FFA424;
        }
      }
    }

    .record-box {
      .record {
        // padding-top: 20rpx;
        border-top: 1px solid #f6f6f6;

        // .record-item:not(:last-child) {
        .record-item:not(:last-child) {
          border-bottom: 1px solid #f6f6f6;
        }

        .top:last-child {
          margin-bottom: 0;
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20rpx;
          margin-bottom: 20rpx;
          margin-top: 10px;

          .left {
            .type {
              // display: flex;
              font-size: 30rpx;
              font-weight: 500;
              color: #8F99A7;
            }

            .time {
              font-size: 12px;
              font-weight: 500;
              color: #C0C8D3;
            }

            .price {
              margin-right: 10px;
              color: #FFA424;

              &.sub {
                color: #80C5CD !important;
              }
            }
          }

          .right {
            display: flex;
            font-size: 28rpx;
            font-weight: 500;

            .add {
              color: #FFA424;
            }

            .sub {
              color: #FFA424;
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

  .goods-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    // border-top: 1px solid #f6f6f6;

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
        width: 80%;
        height: 80%;
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
</style>
