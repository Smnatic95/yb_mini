<template>
  <view class="track-page">
    <view class="goods-box">
      <view class="pic">
        <image src="/static/goods1.png" mode=""></image>
      </view>
      <view class="info">
        <view class="title">原本成年猫粮</view>
        <view class="num">x 1</view>
      </view>
    </view>
    <view class="track-box">
      <view>
        <view class="pic">
          <image src="/static/images/che.png" mode="widthFix"></image>
        </view>
        <view class="text">
          <view>物流公司：顺丰快递</view>
          <view>物流单号：234134312313412</view>
        </view>
      </view>
      <button>复制</button>
    </view>
    <common-logistics :logisticsData="logisticsData"></common-logistics>
  </view>
</template>

<script>
  import {
    setAttribute,
    changeAttribute
  } from '../logistics-template/init-logistics.js';
  import CommonLogistics from '../logistics-template/common-logistics.vue';
  export default {
    components: {
      CommonLogistics
    },
    data() {
      return {
        // testStrList: ['在途', '揽收', '疑难', '签收', '退签', '派件', '退回', '转单', '待清关', '清关中', '已清关', '清关异常', '收件人拒签'],
        logisticsData: [{
            "AcceptStation": "客户签收人: 已签收 感谢使用圆通速递，期待再次为您服务 如有疑问请联系：xxxxxxxxx，投诉电话：020-xxxxxxxx。疫情期间圆通每天对网点多次消毒，快递小哥每天测量体温，佩戴口罩",
            "AcceptTime": "2021-02-28 10:04:59",
          },
          {
            "AcceptStation": "【广东省广州市海珠区工业大道公司】 派件中 派件人: 吴晓贤 电话 xxxxxxxxx 。 圆通快递小哥每天已测体温，请放心收寄快递 如有疑问，请联系：020-xxxxxxxx",
            "AcceptTime": "2021-02-28 08:25:15",

          },
          {
            "AcceptStation": "【广东省广州市海珠区工业大道】 已发出",
            "AcceptTime": "2021-02-28 06:56:54",

          },
          {
            "AcceptStation": "【广东省广州市海珠区工业大道公司】 已收入",
            "AcceptTime": "2021-02-28 06:06:54",

          },
          {
            "AcceptStation": "【广州转运中心】 已发出 下一站 【广东省广州市海珠区工业大道公司】",
            "AcceptTime": "2021-02-28 00:58:47",

          },
          {
            "AcceptStation": "【广州转运中心公司】 已收入",
            "AcceptTime": "2021-02-28 00:19:02",

          },
          {
            "AcceptStation": "【佛山转运中心】 已发出 下一站 【广州转运中心公司】",
            "AcceptTime": "2021-02-27 21:09:35",

          },
          {
            "AcceptStation": "【佛山转运中心公司】 已收入",
            "AcceptTime": "2021-02-27 21:06:51",

          },
          {
            "AcceptStation": "【广东省佛山市禅城】 已发出 下一站 【佛山转运中心公司】",
            "AcceptTime": "2021-02-27 19:42:05",

          },
          {
            "AcceptStation": "【广东省佛山市南海市场部一部公司】 已收件 取件人: 陈xx (xxxxxxxxxxx)",
            "AcceptTime": "2021-02-27 19:38:46",

          },
          {
            "AcceptStation": "【广东省佛山市禅城公司】 已收件 取件人: 吴xx (xxxxxxxxxxx)",
            "AcceptTime": "2021-02-27 14:36:42",

          }
        ]
      };
    },
    onLoad() {
      // this.logisticsData = changeAttribute(this.testStrList, setAttribute(this.logisticsData));
    }
  }
</script>

<style lang="scss">
  .track-page {
    min-height: 100vh;
    padding-top: 22rpx;
    background-color: #f6f6f6;

    .goods-box {
      display: flex;
      padding: 30rpx;
      background-color: #FFFFFF;

      .pic {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120rpx;
        height: 120rpx;
        margin-right: 30rpx;
        background-color: #f6f6f6;
        border-radius: 6px;
        overflow: hidden;

        image {
          width: 80%;
          height: 80%;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .title {
          font-size: 30rpx;
          font-weight: bold;
          color: #000104;
        }

        .num {
          font-size: 30rpx;
          font-weight: bold;
          color: #000104;
        }
      }
    }

    .track-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30rpx 24rpx;
      background-color: #FFFFFF;

      >view {
        display: flex;
        align-items: center;
      }

      .pic {
        width: 50rpx;
        height: 50rpx;
        margin-right: 12rpx;

        image {
          width: 100%;
        }
      }

      .text {
        font-size: 24rpx;
        font-weight: 500;
        line-height: 34rpx;
        color: #294D7C;
      }

      button {
        margin: 0;
        height: 60rpx;

        border: 1px solid #294D7C;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 60rpx;
        color: #294D7C;
      }
    }


  }
</style>
