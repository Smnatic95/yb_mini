<template>
  <view class="page">

    <view class="swiper-box">
      <!-- 搜索框 -->
      <view class="search">
        <view class="logo">
          <image src="https://7n.oripetlife.com/logo.png" mode="heightFix"></image>
        </view>
        <view class="search-box" @click="gotoSearch">
          <icon type="search" size="20" />
          <text>搜索商品</text>
        </view>
      </view>

      <!-- 轮播图 -->
      <swiper :indicator-dots="true" autoplay circular class="banner-box" :interval="5000" :duration="2000">
        <swiper-item v-for="(i,index) in swiperList" :key='index' @click="swiperClick(i)">
          <view class="banner" style="background-color:skyblue;">
            <image :src="i.imgurl" mode="widthFix"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 通告栏 -->
    <view class="notice-box">
      <view class="left">
        <view>通</view>
        <view>知</view>
      </view>
      <swiper :autoplay="true" vertical autoplay circular :interval="6000" :duration="1000">
        <swiper-item>
          <view class="swiper-item">加入原本享受管家式服务</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item">后续更多功能敬请期待</view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 活动 -->
    <view class="gird-box">
      <uni-grid :column="4" :showBorder="false" :square="false">
        <!-- <uni-grid-item>
          <view class="container" @click="gotoSeckill">
            <view class="pic">
              <image src="/static/images/coupon.png"></image>
            </view>
            <view class="text">秒杀活动</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="container" @click="gotoPublic">
            <view class="pic">
              <image src="/static/images/coupon.png"></image>
            </view>
            <view class="text">公益勋章</view>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="container" @click="gotoLottery">
            <view class="pic">
              <image src="/static/images/coupon.png"></image>
            </view>
            <view class="text">抽奖活动</view>
          </view>
        </uni-grid-item> -->
        <!--   <uni-grid-item>
          <view class="container" @click="gotoCardActive">
            <view class="pic">
              <image src="/static/images/coupon.png"></image>
            </view>
            <view class="text">年卡活动</view>
          </view>
        </uni-grid-item> -->
        <uni-grid-item>
          <view class="container" @click="gotoCount">
            <view class="pic">
              <image src="/static/images/counter.png"></image>
            </view>
            <view class="text">计算器</view>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <!-- 热门榜单 -->
    <view class="hot-box">
      <view class="title">
        <view class="name">
          <view></view>热门榜单
        </view>
        <view class="more" @click="gotoHomeMore('hot')">
          查看更多<uni-icons type="arrowright" size="13" color=""></uni-icons>
        </view>
      </view>
      <view class="scroll">
        <scroll-view scroll-x="true" class="scroll-view_H">
          <view class="item scroll-view-item_H" v-for="item in hotList" :key='item.id' @click="gotoGoodsDetail(item)">
            <view class="item-pic">
              <image :src="'https://7n.oripetlife.com/'+item.img"></image>
            </view>
            <view class="item-name">{{item.name}}</view>
            <view class="bottom">
              <image src="https://7n.oripetlife.com/huiyuanjia.png" mode=""></image>
              <view class="item-price">￥{{item.market_price}}</view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- 首发新品 -->
    <view class="new-box">
      <view class="title">
        <view class="name">
          <view></view>首发新品
        </view>
        <view class="more" @click="gotoHomeMore('new')">
          查看更多<uni-icons type="arrowright" size="13" color=""></uni-icons>
        </view>
      </view>
      <swiper class="new-swiper" circular :autoplay="true" :interval="10000" :duration="2500">
        <swiper-item v-for="(item,i) in newList" :key='i'>
          <view class="swiper-item">
            <view class="container">

              <view class="left" @click="gotoGoodsDetail(item[0])">
                <view class="name">{{item[0].name}}</view>
                <view class="intro">
                  {{item[0].introduction}}
                </view>

                <view class="price-box-m">
                  <image class="icon" src="https://7n.oripetlife.com/huiyuanjia.png" mode="heightFix"></image>
                  <text class="price-m">{{item[0].market_price}}</text>
                </view>

                <view class="pic">
                  <image :src="'https://7n.oripetlife.com/'+item[0].img" mode="widthFix"></image>
                </view>

              </view>

              <view class="right">
                <view @click="gotoGoodsDetail(item[1])">
                  <view class="name">{{item[1].name}}</view>
                  <view class="intro">{{item[1].introduction}}</view>
                  <view class="price-box">

                    <view class="price-box-m">
                      <image class="icon" src="https://7n.oripetlife.com/huiyuanjia.png" mode="heightFix"></image>
                      <text class="price-m">{{item[1].market_price}}</text>
                    </view>

                    <view class="pic">
                      <image :src="'https://7n.oripetlife.com/'+item[1].img" mode="widthFix"></image>
                    </view>

                  </view>
                </view>
                <view @click="gotoGoodsDetail(item[2])">
                  <view class="name">{{item[2].name}}</view>
                  <view class="intro">{{item[2].introduction}}</view>
                  <view class="price-box">

                    <view class="price-box-m">
                      <image class="icon" src="https://7n.oripetlife.com/huiyuanjia.png" mode="heightFix"></image>
                      <text class="price-m">{{item[0].market_price}}</text>
                    </view>

                    <view class="pic">
                      <image :src="'https://7n.oripetlife.com/'+item[2].img" mode="widthFix"></image>
                    </view>
                  </view>
                </view>
              </view>

            </view>
          </view>
        </swiper-item>

      </swiper>
    </view>

    <!-- 分类 -->
    <view class="scroll-box">
      <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" :scroll-into-view="cateScrollTO"
        :scroll-with-animation="true">
        <view :id="'demo'+i" :class="['scroll-view-item_H',i===active?'active':'']" v-for="(item,i) in scrollList"
          :key='i' @click="activeChanged(item,i)">{{item.title}}</view>
      </scroll-view>
    </view>

    <!-- 商品列表 -->
    <home-goodsitem :goodsList='goodsList'></home-goodsitem>

    <uni-popup ref="popupAsk" type="center">
      <view class="box_ask">
        <view class="title">
          您可以通过以下方式问诊
        </view>
        <view class="menus">

          <view class="menu wechat" @click="getKefuWechat" v-if="userInfo.mobile">
            <image class="img_menu" src="../../static/images/wechat.png"></image>
            <view class="title_menu">
              客服微信
            </view>
          </view>

          <button class="menu wechat" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-else>
            <image class="img_menu" src="../../static/images/wechat.png"></image>
            <view class="title_menu">
              客服微信
            </view>
          </button>

          <button class="menu mini" open-type="contact">
            <image class="img_menu" src="../../static/images/icon/kefu.png"></image>
            <view class="title_menu">
              小程序客服
            </view>
          </button>

        </view>

        <view class="box_btn">
          <view class="btn" @click="this.$refs.popupAsk.close()">取消</view>
        </view>

      </view>
    </uni-popup>

  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js';
  import shareMix from '@/mixins/share-app.js';
  import phoneMix from '@/mixins/get-phone.js';

  export default {
    mixins: [badgeMix, shareMix, phoneMix], // 导入公共js
    data() {
      return {
        active: 0,
        goodsListAll: [],
        goodsList: [],
        hotList: [],
        newList: null,
        parent_id: '',
        swiperList: [{
          key: 'petDoc',
          imgurl: uni.$baseUrl1 + 'yb-banner-001.jpg'
        }, {
          imgurl: uni.$baseUrl1 + 'yb-banner-002.jpg',
          url: "/mypkg/vip/vip"
        }, {
          imgurl: uni.$baseUrl1 + 'yb-banner-003.jpg',
          url: "/mypkg/score-goods/score-goods"
        }],
        cateScrollTO: 'demo1'
      };
    },
    computed: {
      ...mapState('home', ['scrollList']),
      ...mapState('user', ['userInfo'])
    },
    onLoad() {
      this.getHotList();
      this.getNewList();
      this.getGoodsList();
    },
    methods: {
      // 热门榜单
      async getHotList() {
        const {
          data: res
        } = await uni.$http.get('user_hots_skus/')
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        this.hotList = res.lists
        // 四袋装
        this.hotList.forEach(item => {
          if (item.id === 32 || item.id === 33 || item.id === 34) {
            item.market_price = (Number(item.market_price) * 4).toFixed(2)
            item.price = (Number(item.price) * 4).toFixed(2)
          }
        })
        // 售空
        const arr1 = res.lists.filter(x => x.stock > 0)
        const arr2 = res.lists.filter(x => x.stock == 0)
        this.hotList = [...arr1, ...arr2]
      },
      // 新品
      async getNewList() {
        const {
          data: res
        } = await uni.$http.get('user_news_skus/')
        if (res.code !== 200) return uni.$showMsg(res.msg)
        console.log(res.lists);
        let newList = [
          []
        ];
        res.lists.forEach((item, i) => {
          if (newList[newList.length - 1].length < 3) {
            newList[newList.length - 1].push(item);
          } else {
            newList[newList.length] = [item];
          }
        })
        this.newList = newList;
      },
      // 获取商品列表
      async getGoodsList() {
        const {
          data: res
        } = await uni.$http.get('user_skus/')
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        this.goodsListAll = res.lists
        // 四袋装
        this.goodsListAll.forEach(item => {
          if (item.id == 32 || item.id == 33 || item.id == 34) {
            item.market_price = (Number(item.market_price) * 4).toFixed(2)
            item.price = (Number(item.price) * 4).toFixed(2)
          }
        })
        const arr1 = this.goodsListAll.filter(x => x.stock > 0)
        const arr2 = this.goodsListAll.filter(x => x.stock == 0)
        this.goodsList = [...arr1, ...arr2]
      },

      activeChanged(item, i) {
        this.active = i;
        this.cateScrollTO = i < 2 ? 'demo0' : 'demo' + (i - 2);
        if (!item.type && item.type != 0) return this.getGoodsList()
        const arr = [...this.goodsListAll.filter(x => x.type == item.type)]
        const arr1 = arr.filter(x => x.stock > 0)
        const arr2 = arr.filter(x => x.stock == 0)
        this.goodsList = [...arr1, ...arr2]
      },

      async getKefuWechat(e) {
        let phone_id = this.userInfo && this.userInfo.mobile ? this.userInfo.mobile : '';
        const {
          data: res
        } = await uni.$http.get(`sale_qrcode/${phone_id}/`);
        let SaleQrcode = uni.$baseUrl1 + res.image;
        uni.previewImage({
          urls: [SaleQrcode],
          current: SaleQrcode
        })
      },

      swiperClick(swipe) {
        if (swipe.url) {
          uni.navigateTo({
            url: swipe.url
          })
        } else if (swipe.key == 'petDoc') {
          console.log(1111111111);
          this.$refs.popupAsk.open();
        }
      },

      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },

      gotoGoodsDetail(item) {
        console.log(item)
        uni.navigateTo({
          url: `/subpkg/goods_detail/goods_detail?id=${item.id}&goods_stock=${item.stock}&goods_img=${item.img}&weight=${item.weight}`,
        })
      },

      gotoHomeMore(type) {
        // 查看更多
        uni.navigateTo({
          url: '/subpkg/home-more/home-more?type=' + type
        })
      },

      gotoSeckill() {
        uni.navigateTo({
          url: '/mypkg/seckill/seckill'
        })
      },

      gotoAddress() {
        uni.navigateTo({
          url: '/mypkg/address/address'
        })
      },

      gotoCardActive() {
        uni.navigateTo({
          url: '/mypkg/card-active/card-active'
        })
      },

      gotoPublic() {
        uni.navigateTo({
          url: '/mypkg/public-welfare/public-welfare'
        })
      },

      gotoLottery() {
        uni.navigateTo({
          url: '/mypkg/lottery/lottery'
        })
      },

      gotoCount() {
        uni.navigateTo({
          url: '/mypkg/count/count'
        })
      }

    },

    onPullDownRefresh() {
      this.getHotList()
      this.getNewList()
      this.getGoodsList()
      uni.stopPullDownRefresh()
    }

  }
</script>

<style lang="scss">

  .page {
    padding-bottom: 15rpx;
  }

  .box_ask {
    width: 75vw;
    border-radius: 30rpx;
    background-color: #fff;
    font-size: 29rpx;
    padding-bottom: 10px;

    >.title {
      text-align: center;
      height: 100rpx;
      line-height: 100rpx;
      color: #555;
    }

    .menus {
      display: flex;
      justify-content: center;

      .menu {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 25rpx;
        margin-top: 20rpx;
        padding-right: 25rpx;
        font-size: 29rpx;
        background-color: #ffff;

        &.wechat {
          border-right: 1px solid #eee
        }

        &.mini {
          margin-right: 0;
          padding-right: 0;
        }


        &::after {
          border: none;
        }

        .img_menu {
          width: 60rpx;
          height: 60rpx;
        }

        .title_menu {
          margin-top: 5rpx;
          height: 30rpx;
          line-height: 30rpx;
        }

      }
    }

    .box_btn {
      .btn {
        width: 90%;
        margin: 70rpx auto 0;
        height: 70rpx;
        line-height: 70rpx;
        text-align: center;
        background: #F8F8F8;
        border-radius: 60rpx;
        border: 1px solid #eee;
        color: gray;
      }
    }

  }


  .price-box-m {
    display: flex;
    align-items: flex-end;
    margin-top: 20rpx;

    .icon {
      height: 26rpx !important;
      margin-top: 0 !important;
    }

    .price-m {
      color: var(--color-money);
      font-weight: bold;
      font-size: 32rpx;
      height: 32rpx;
      line-height: 32rpx;
      margin-left: 4rpx;
    }
  }

  .search {
    display: flex;
    padding: 10px 20px 10px 15px;

    .logo {
      height: 35px;

      image {
        height: 100%;
      }
    }

    .search-box {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
      background: #F6F6F6;
      border-radius: 20px;

      text {
        width: 52px;
        height: 18px;
        margin-left: 5px;
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #C0C8D3;
      }
    }

  }

  // 搜索
  .swiper-box {
    background: linear-gradient(top, #49b0f9 0%, #f6f6f6 90%);

    swiper {
      height: 300rpx;
      margin: 0 15px;
      border-radius: 5rpx !important;
      overflow: hidden !important;

      swiper-item {
        border-radius: 5px;
        overflow: hidden;
      }

      .banner {
        height: 300rpx;
        border-radius: 5px;
        overflow: hidden;
      }

      image {
        width: 100%;
      }
    }
  }

  // 轮播
  .banner {}

  // 通告栏
  .notice-box {
    display: flex;
    align-items: center;
    height: 60rpx;
    margin: 8px 15px;
    padding: 5px 10px;
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;

    .left {
      display: flex;
      font-size: 12px;
      margin-right: 10px;
      border: 1px solid #49b0f9;
      border-radius: 3px;

      view:nth-child(1) {
        color: #FFFFFF;
        background-color: #49b0f9;
        padding: 3rpx 8rpx;
      }

      view:nth-child(2) {
        color: #49b0f9;
        // background-color: #FFFFFF;
        padding: 3rpx 8rpx;
      }
    }

    swiper {
      flex: 1;
      height: 100%;
      color: #8F99A7;
      font-size: 32rpx;
    }
  }

  // 宫格
  .gird-box {
    background-color: #FFFFFF;
    margin: 10px 15px;
    border-radius: 5px;
    min-height: 180rpx;

    uni-grid-item {
      padding-bottom: 10px;

      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 12px;
        color: #8F99A7;
      }

      .pic {
        width: 100rpx;
        height: 100rpx;
        margin: 20rpx 0 6rpx;
        border-radius: 50%;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  // 热门榜单
  .hot-box,
  .new-box {
    margin: 0 15px 10px;
    background-color: #FFFFFF;
    border-radius: 5px;
    overflow: hidden;

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px;

      .name {
        display: flex;
        align-items: center;
        font-weight: bold;
        // padding-left: 5px;

        >view {
          width: 3px;
          height: 12px;
          margin-right: 5px;
          background-color: #294D7C;
        }
      }

      .more {
        font-size: 13px;
        color: #8F99A7;
      }
    }
  }

  .hot-box {
    .scroll-view_H {
      white-space: nowrap;
      // width: 350px;

      .scroll-view-item_H {
        display: inline-block;
        margin-right: 10px;
        font-weight: 500;
        color: #8F99A7;
      }
    }

    .scroll {
      padding: 0 10px;
    }

    scroll-view {
      .item {
        font-size: 13px;
        width: 105px;

        .item-pic {
          width: 105px;
          height: 105px;
          background-color: #F6F6F6;
          border-radius: 5px;
          overflow: hidden;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .item-name {
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
        }

        .bottom {
          display: flex;
          // justify-content: space-between;
          align-items: center;
          // margin: 10px 0;
          padding: 10px 0;

          .item-price {
            font-size: 14px;
            color: var(--color-money);
            font-weight: bold;
          }

          .item-sales {
            font-size: 11px;
            color: var(--color-money);
            text-decoration: line-through;
          }

          image {
            // margin-left: 6rpx;
            margin-right: 6rpx;
            width: 46rpx;
            height: 28rpx;
          }
        }
      }
    }
  }

  // 首发新品
  .new-box {
    box-sizing: border-box;

    .new-swiper {
      height: 550rpx;
      // height: 465rpx;
    }

    .container {
      display: flex;
      margin-bottom: 5px;

      .left,
      .right {
        width: 50%;
        padding: 0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .icon {
          // margin-right: 20rpx;
          margin-top: 20px;
          width: 46rpx;
          height: 28rpx;
        }
      }

      .left {
        border-right: 1px solid #F6F6F6;

        .pic {
          width: 304rpx;
          height: 304rpx;
          margin-top: 40rpx;
          background-color: #F6F6F6;
          border-radius: 5px;
          overflow: hidden;

          image {
            width: 100%;
          }
        }
      }

      .right {
        >view:nth-child(1) {
          padding-bottom: 5px;
        }

        >view:nth-child(2) {
          border-top: 1px solid #F6F6F6;

          .name {
            margin-top: 5px;
          }
        }

        .price-box {
          display: flex;
          justify-content: space-between;

          .price-box-m {
            align-self: flex-start;
            margin-right: 5rpx;
          }

          .text,
          .pic {
            width: 150rpx;
          }

          .pic {
            height: 150rpx;
            margin-top: 10px;
            background-color: #F6F6F6;
            border-radius: 5px;
            overflow: hidden;

            image {
              // margin-top: 10px;
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .name,
      .intro {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      }

      .name {
        font-size: 15px;
        font-weight: bold;
      }

      .intro {
        margin-top: 5px;
        font-size: 13px;
        color: #8F99A7;
      }

      .dis-price {
        // margin-top: 10px;
        color: #294D7C;
        font-weight: bold;
      }

      .price {
        margin-top: 5px;
        margin-bottom: 10px;
        font-size: 12px;
        text-decoration: line-through;
        color: #8F99A7;
      }

    }
  }

  // 分类
  .scroll-box {
    position: sticky;
    top: 0;
    padding: 0 30rpx;
    background-color: #FFFFFF;
    padding: 12rpx 0;

    .scroll-view_H {
      white-space: nowrap;
      width: 100%;

      .scroll-view-item_H {
        display: inline-block;
        font-size: 32rpx;
        font-family: PingFang SC;
        padding: 20rpx 16rpx;
        font-weight: 500;
        color: #8F99A7;
        transition: all .1s ease-in;

        &.active {
          color: #294D7C;
          transform: scale(1.05);
          position: relative;
        }

        &.active::before {
          content: '';
          display: block;
          position: absolute;
          bottom: 9rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 50rpx;
          height: 2rpx;
          background-color: #294D7C;
        }

      }
    }
  }
</style>
