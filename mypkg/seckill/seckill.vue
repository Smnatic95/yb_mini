<template>
  <view class="page">
    <view class="pic-box">
      <image src="/static/images/bg1.png" mode="widthFix"></image>
    </view>

    <view class="time-box">
      <view class="icon">
        <image src="/static/images/hot-icon.png" mode="widthFix"></image>
      </view>
      <view :class="['time',active==i?'active':'']" v-for="(item,i) in timeArr" :key='item' @click="activeClick(i)">
        <view class="title">{{item}}</view>
        <view class="status">即将开始</view>
      </view>
    </view>

    <view class="bar_yd" v-if="!timeCountDown.isEnd">
      <view class="rob">
        <view class="title">
          119人疯抢中
        </view>
        <view class="box_avatars">

          <view class="box_avatar">
            <image class="avatar" src="https://img.zcool.cn/community/014ae65e78353ba80120a89596f262.png"
              mode="scaleToFill"></image>
          </view>
          <view class="box_avatar">
            <image class="avatar" src="https://www.yh31.com/uploadfile/wx/202102282012199461.jpg" mode="scaleToFill">
            </image>
          </view>
          <view class="box_avatar">
            <image class="avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVXyFhGuKcBHVamSTZcuQOA-_vLEtbipyVMP12IU0YOfHuIHcfWHcruhZbLAYXWWOsVPs&usqp=CAU"
              mode="scaleToFill"></image>
          </view>

        </view>
      </view>
      <view class="time_remaining">
        <view class="title">
          距结束
        </view>
        <view class="detail">
          <view class="unit hour">
            {{timeCountDown.hour}}
          </view>
          <view class="decollator">
            :
          </view>
          <view class="unit minute">
            {{timeCountDown.minute}}
          </view>
          <view class="decollator">
            :
          </view>
          <view class="unit second">
            {{timeCountDown.second}}
          </view>
          <view class="decollator">
            :
          </view>
          <view class="unit rsecond">
            {{timeCountDown.rsecond}}
          </view>
        </view>

      </view>
    </view>


    <view class="goods_list">

      <view class="goods_item" v-for="(item,i) in cart_list" :key='i'>

        <view class="thumb">
          <image :src="item.goods_img" mode="scaleToFill"></image>
        </view>

        <view class="pull_right">

          <view class="moudle goods_title">
            {{item.goods_name}}
          </view>

          <view class="moudle count">
            <view class="progress">
              <view class="done" style="width: 70%;"></view>
              <view class="percent">
                75%
              </view>
            </view>
            <view class="ele">
              已抢74件
            </view>
          </view>

          <view class="moudle price_box">
            <view class="now">
              <text class="toa">秒杀价:<text class="rmbicon">￥</text></text><text
                class="detail">{{item.market_price}}</text>
            </view>
            <view class="yhd">
              直降45.27元
            </view>
          </view>

        </view>

      </view>

    </view>

  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {
        active: 0,
        timeArr: ['10:00', '12:00', '15:00'],
        timeCountDown: {
          endTimer: null,
          isEnd: false,
          endTimeSteamp: new Date().getTime() + 60 * 60 * 1000,
          hour: 0,
          minute: 0,
          second: 0,
          rsecond: 0
        }
      }
    },
    computed: {
      ...mapState('cart', ['cart_list']),
    },
    onLoad() {
      this.timeCountDown.endTimer = setInterval(() => {
        let endTimeSteamp = this.timeCountDown.endTimeSteamp,
          diffmillisecond = endTimeSteamp - new Date().getTime();
        if (diffmillisecond > 0) {
          let diff_hour = Math.floor(diffmillisecond / 1000 / 60 / 60),
            diff_minute = Math.floor(diffmillisecond / 1000 / 60 - (diff_hour * 60)),
            diff_second = Math.floor(diffmillisecond / 1000 - (diff_hour * 60 * 60 + diff_minute * 60)),
            diff_rsecond = Math.floor(diffmillisecond / 100 - (diff_hour * 60 * 60 * 10 + diff_minute * 60 * 10 +
              diff_second * 10));
          this.timeCountDown.hour = this.add0(diff_hour);
          this.timeCountDown.minute = this.add0(diff_minute);
          this.timeCountDown.second = this.add0(diff_second);
          this.timeCountDown.rsecond = diff_rsecond;
        } else {
          clearInterval(this.timeCountDown.endTimer);
          this.timeCountDown.endTimer = null;
          this.timeCountDown.isEnd = true;
        }
      }, 100)
    },
    methods: {
      activeClick(i) {
        this.active = i
        console.log(this.cart_list)
      },
      add0(number) {
        return number < 10 ? '0' + number : number;
      }
    }
  }
</script>

<style lang="scss">
  .page {
    font-size: 28rpx;
  }

  .bar_yd {
    background-color: #FEEDEF;
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    color: #B5392E;

    .time_remaining {
      display: flex;

      >.title {
        height: 40rpx;
        line-height: 40rpx;
        margin-right: 10rpx;
      }

      .detail {
        display: flex;

        .unit {
          color: #fff;
          font-size: 30rpx;
          height: 40rpx;
          padding: 0 5rpx;
          line-height: 40rpx;
          border-radius: 7rpx;
          background-color: #FA4E52;
        }

        &.rsecond {
          border-radius: 5rpx;
        }

        .decollator {
          width: 20rpx;
          text-align: center;
        }
      }
    }

    .rob {
      display: flex;
      align-items: center;

      >.title {
        margin-right: 20rpx;
        font-weight: 500;
        height: 40rpx;
        line-height: 40rpx;
      }

      .box_avatars {
        display: flex;

        .box_avatar {
          padding: 3rpx;
          background-color: #fff;
          border-radius: 50%;
          margin-left: -10rpx;

          .avatar {
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
          }
        }

        .box_avatar:first-of-type {
          margin-left: 0;
        }

      }
    }
  }

  .pic-box {
    width: 100%;
    border-radius: 20rpx;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods_list {
    padding-top: 20rpx;
    background-color: #fff;

    .goods_item {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      padding-bottom: 20rpx;
      margin-bottom: 20rpx;
      border-bottom: 1px solid #eee;

      .thumb {
        display: flex;
        width: 200rpx;
        height: 200rpx;
        margin: 0 15rpx;
        background: #F0F0F0;
        border-radius: 6px;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .pull_right {
        box-sizing: border-box;
        width: calc(100% - 200rpx);
        padding-top: 10rpx;
        padding-bottom: 5rpx;
        padding-left: 5rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .goods_title {
          font-size: 32rpx;
          font-weight: 600;
        }

        .count {

          display: flex;
          align-items: center;

          .progress {
            width: 300rpx;
            height: 30rpx;
            margin-right: 20rpx;
            background-color: #F1ABAB;
            border-radius: 30rpx;
            overflow: hidden;
            position: relative;

            .done {
              height: 100%;
              background-color: #DF2F22;
            }

            .percent {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
              font-size: 24rpx;
              height: 30rpx;
              line-height: 30rpx;
            }

          }


          .ele {
            color: gray;
            font-size: 26rpx;
          }

        }

        .price_box {
          display: flex;
          align-items: flex-end;
          color: #B4200F;

          .now {
            .toa {}

            .rmbicon {
              font-size: 24rpx;
              font-weight: 600;
            }

            .detail {
              height: 43rpx;
              line-height: 43rpx;
              font-size: 43rpx;
            }
          }

          .yhd {
            font-size: 24rpx;
            border: 1px solid #A67E83;
            margin-left: 15rpx;
            padding: 0 10rpx;
            border-radius: 15rpx;
            height: 30rpx;
            line-height: 30rpx;
          }

        }

      }
    }
  }

  .time-box {
    display: flex;
    align-items: center;
    height: 63px;
    padding: 0 10px;

    image {
      width: 37px;
      margin-top: 12px;
    }

    .time {
      margin-left: 20px;
      text-align: center;

      .title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .status {
        height: 18px;
        font-size: 12px;
        color: #666;
      }

      &.active {
        .title {
          color: #B5392E;
        }

        .status {
          padding: 0 5px;
          color: #FFFFFF;
          background: #B5392E;
          border-radius: 9px;
        }
      }
    }
  }
</style>
