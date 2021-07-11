<template>
  <view class="bg-white margin-top">
    <view class="common-logistics">
      <view class="logistic-item" v-for="(item,index) in logisticsData" :key="index">
        <view class="total-wrap" :style="{marginTop: item.isFirstNode ? '22rpx' : '6rpx'}">
          <view class="item-container">
            <!-- <view class="item-container-left flex flex-direction align-center"
              :class="[index == 0 ? 'text-1A1A1A' : 'text-808080']">
              <text class="text-df">{{item.monthDay}}</text>
              <text class="text-sm">{{item.hourMinute}}</text>
            </view> -->

            <view class="item-container-center">
              <view class="tag-container">
                <!--                <image v-if="item.isFirstNode && String(item.status) != 'null'" :src="nodeIconUrl(item.status,index)"
                  mode="scaleToFill"></image> -->
                <view class="item-tag-container">
                  <image class="item-tag"
                    :src="[index == 0 ? '/static/images/active-line-state.png' : '/static/images/line-state.png']"
                    mode="scaleToFill"></image>
                </view>
              </view>
              <view class="line-container">
                <view v-if="index !== logisticsData.length - 1" class="line" style="height:80rpx"></view>
              </view>
            </view>

            <view class="item-container-right" :style="{paddingTop: item.isFirstNode?'0':'8rpx'}">
              <!--     <view v-if="item.isFirstNode" class="item-title text-dm text-bold"
                :class="[index == 0 ? 'text-1A1A1A' : 'text-808080']">{{item.status}}</view> -->
              <view class="item-desc text-dm" :class="[index == 0 ? 'text-1A1A1A' : 'text-999999']"
                :style="{marginTop: item.isFirstNode ? '10rpx' : '0'}">{{item.AcceptStation}}</view>
              <view class="item-time">{{item.AcceptTime}}</view>
            </view>

          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      logisticsData: {
        type: [Object, Array]
      }
    },
    computed: {
      nodeIconUrl() {
        return function(data, isFirstIndex) {
          // 0在途，1揽收，2疑难，3签收，4退签，5派件，6退回，7转单，10待清关，11清关中，12已清关，13清关异常，14收件人拒签
          // 图标根据需要自行更改,这里只作演示
          if (data == '在途') {
            return isFirstIndex === 0 ? '/static/images/logo.png' : '/static/images/logo.png'
          } else if (data == '揽收') {
            return isFirstIndex === 0 ? '/static/images/logo.png' : '/static/images/logo.png'
          } else if (data == '在途') {
            return isFirstIndex === 0 ? '/static/images/logo.png' : '/static/images/logo.png'
          } else if (data == '疑难') {
            return isFirstIndex === 0 ? '/static/images/logo.png' : '/static/images/logo.png'
          } else if (data == '签收') {
            return isFirstIndex === 0 ? '/static/images/logo.png' : '/static/images/logo.png'
          } else if (data == '退签') {
            return isFirstIndex === 0 ? '/static/images/logo.png' : '/static/images/logo.png'
          } else if (data == '派件') {
            return isFirstIndex === 0 ? '/static/images/logo.png' : '/static/images/logo.png'
          } else if (data == '退回') {
            return isFirstIndex === 0 ? '/static/images/logo.png' : '/static/images/logo.png'
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .common-logistics {
    height: auto;
    box-sizing: border-box;
    padding: 20rpx 30rpx 50rpx;
    background-color: #FFFFFF;
    margin-top: 20rpx;
  }

  .item-container {
    width: 100%;
    height: auto;
    display: flex;

    .item-container-left {
      display: flex;
      flex-direction: column;
      width: 120rpx;
      max-width: 120rpx;
      text-align: center;

      .text-df {
        font-size: 28rpx;
      }

      .text-sm {
        font-size: 24rpx;
      }
    }

    .item-container-center {
      width: 44rpx;
      height: auto;

      .tag-container {
        width: 44rpx;
        height: 44rpx;

        image {
          width: 44rpx;
          height: 44rpx;
          border-radius: 50%;
        }

        .item-tag-container {
          width: 44rpx;
          height: 44rpx;
          display: flex;
          justify-content: center;
          align-items: center;

          .item-tag {
            width: 14rpx;
            height: 14rpx;
            border-radius: 50%;
          }
        }
      }

      .line-container {
        box-sizing: border-box;
        width: 44rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        .line {
          width: 2rpx;
          background-color: #dcdcdc;
        }
      }
    }

    .item-container-right {
      width: 720rpx;
      // max-width: 720rpx;
      box-sizing: border-box;
      padding: 0 10rpx 0 24rpx;

      .item-title {
        width: 100%;
        height: 40rpx;
        line-height: 44rpx;
        color: #222;
        font-size: 24rpx;
      }

      .item-desc {
        margin-top: 16rpx;
        width: 100%;
        min-height: 30rpx;
        line-height: 36rpx;
        font-size: 26rpx;
        word-wrap: break-word;
        word-break: normal;
      }

      .item-time {
        margin: 20rpx 0;
        width: 100%;
        height: 34rpx;
        line-height: 34rpx;
        font-size: 24rpx;
        color: #999999;
      }
    }
  }

  .line-state {
    width: 20rpx;
    height: 20rpx;
    border-radius: 50%;
  }

  .take-space {
    width: 100%;
    height: 80rpx;
  }

  .text-1A1A1A {
    color: #1A1A1A;
  }

  .text-999999 {
    color: #999999;
  }

  .text-808080 {
    color: #808080;
  }
</style>
