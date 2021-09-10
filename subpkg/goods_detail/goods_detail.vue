<template>
  <view class="container">
    <view class="goods_detail-page">
      <!--商品轮播图-->
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" circular :duration="1000">
        <swiper-item v-for="(item,i) in goodsInfo.image" :key='i' @click="previewSwiperImg(i)">
          <view class="pic">
            <image :src="item"></image>
          </view>
        </swiper-item>
      </swiper>
      <view class="text-box">
        <view class="text-left">
          <view class="title">{{goodsInfo.name}}</view>
          <view class="intro">{{goodsInfo.introduction}}</view>
          <view class="price-col">
            <text class="icon">￥</text>
            <text class="price">{{goodsInfo.market_price}}</text>
            <image src="https://7n.oripetlife.com/huiyuanjia.png"></image>
            <text class="price-dis">￥<text>{{goodsInfo.price}}</text></text>
          </view>
        </view>
        <view class="icon-right">
          <view class="icon" @click="collectChanged">
            <image v-if="!is_collect" src="../../static/images/shoucang.png"></image>
            <image v-else src="../../static/images/shoucang-active.png"></image>
          </view>
          <button open-type='share'>
            <!-- <view class="icon"> -->
            <!-- <button> -->
            <image src="https://7n.oripetlife.com/share.png"></image>
            <!-- </button> -->
            <!-- </view> -->
          </button>
        </view>
      </view>
      <view class="serve-box">
        <view class="serve-item" @click="showServePopup(1)">
          <view>
            <view class="title">服务说明</view>
            <view class="text">
              <view class="text-item">
                <view class="iconfont icon-duigou"></view>
                <text>7天无理由退换</text>
              </view>
              <view class="text-item">
                <view class="iconfont icon-duigou"></view>
                <text>急速退款</text>
              </view>
              <view class="text-item">
                <view class="iconfont icon-duigou"></view>
                <text>正品保证</text>
              </view>
            </view>
          </view>
          <uni-icons type="arrowright" size="12" color=""></uni-icons>
        </view>
        <view class="serve-item" @click="showServePopup(2)">
          <view>
            <view class="title">产品参数</view>
            <view class="text">
              <view class="text-item">
                <text>品牌</text>
              </view>
              <view class="text-item">
                <text>厂家</text>
              </view>
            </view>
          </view>
          <uni-icons type="arrowright" size="12" color=""></uni-icons>
        </view>
      </view>
      <!-- <view class="comment">
        <view class="info">
          <view class="info-left">用户评价（3）</view>
          <view class="info-right" @click="gotoComments">
            查看全部
            <uni-icons type="arrowright" size="13" color="#C0C8D3"></uni-icons>
          </view>
        </view>
        <scroll-view class="comment-list" scroll-x="true" scroll-left="0">
          <view id="demo1" class="comment-item">
            <view class="user">
              <view class="avatar">
                <image src="../../static/avatar.png"></image>
              </view>
              <text>用户名</text>
            </view>
            <view class="comment-text">这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是
            </view>
          </view>
          <view id="demo1" class="comment-item">
            <view class="user">
              <view class="avatar">
                <image src="../../static/avatar.png"></image>
              </view>
              <text>用户名</text>
            </view>
            <view class="comment-text">这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是评论内容这里是
            </view>
          </view>
        </scroll-view>
      </view> -->
      <!--商品详情-->
      <view class="details">
        <view class="title">—— 商品详情 ——</view>
        <view class="pics" v-for="(item,i) in goodsInfo.de_image" :key='i' @click="previewDetailImg(i)">
          <image v-if="item!==null" :src="item" mode="widthFix"></image>
        </view>
      </view>
      <!-- 售空 -->
      <view class="sale-out" v-if="goods_stock==0">已售空~</view>
      <!--底部按钮-->
      <view class="goodsnav">
        <view class="kefu">
          <button open-type="contact" @contact="handleContact">
            <view class="iconfont icon-kefu1"></view>
            <view class="text">客服</view>
          </button>
        </view>
        <view class="goods-nav">
          <view class="cart" @click="gotoCart">
            <view class="iconfont icon-shoppingcart"></view>
            <view class="text">购物袋</view>
            <uni-badge :text="num" type="error" size='small'></uni-badge>
          </view>
          <view class="btns">

            <button class='btn1' @click="addToCartHandler_b"
              :style="{backgroundColor: goods_stock == 0 ? '#ccc': null }">加入购物车</button>
            <button class='btn2' v-if="token" @click="showPopup"
              :style="{backgroundColor: goods_stock == 0 ? '#ccc': null }">立即购买</button>
            <button class='btn2' v-else :style="{backgroundColor: goods_stock == 0 ? '#ccc': null }"
              open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">立即购买</button>

          </view>
        </view>
      </view>
      <!--立即购买弹窗-->
      <uni-popup ref="popup" type="bottom" background-color="#fff">
        <view class="settle-box">
          <goods-item :goods="goods" :showRadio="false" @num-change='numberChangeHandler'></goods-item>
          <button @click="onSettle">立即购买</button>
        </view>
      </uni-popup>
      <!--加入购物车弹窗-->
      <uni-popup ref="popup_addCar" type="bottom" background-color="#fff">
        <view class="settle-box addcar">
          <goods-item :goods="goods" :showRadio="false" @num-change='numberChangeHandler'></goods-item>
          <button @click="addToCartHandler()">确定</button>
        </view>
      </uni-popup>
      <!--服务说明弹窗-->
      <uni-popup ref="popup1" type="bottom">
        <view class="popup-box">
          <view class="serve-intro">
            <view class="title">服务说明</view>
            <view class="item">
              <view class="left">
                <view class="iconfont icon-duigou"></view>
              </view>
              <view class="right">
                <view class="right1">7天无理由退换</view>
                <view class="right2">在签收商品之日起七天内，未拆封的商品，可申请无理由退货</view>
              </view>
            </view>
            <view class="item">
              <view class="left">
                <view class="iconfont icon-duigou"></view>
              </view>
              <view class="right">
                <view class="right1">快速退款</view>
                <view class="right2">用户发起退款，经审核后享受急速退款到账</view>
              </view>
            </view>
            <view class="item">
              <view class="left">
                <view class="iconfont icon-duigou"></view>
              </view>
              <view class="right">
                <view class="right1">正品保证</view>
                <view class="right2">100%正品保证</view>
              </view>
            </view>

          </view>
        </view>
      </uni-popup>
      <!--产品参数弹窗-->
      <uni-popup ref="popup2" type="bottom">
        <view class="popup-box">
          <view class="parameter">
            <view class="title">产品参数</view>
            <view class="item">
              <view class="left">保质期</view>
              <view class="right">半年以上</view>
            </view>
            <view class="item">
              <view class="left">品牌</view>
              <view class="right">{{goodsInfo.brand}}</view>
            </view>
            <view class="item">
              <view class="left">生产厂家</view>
              <view class="right">{{goodsInfo.producer}}</view>
            </view>
            <view class="item">
              <view class="left">适用对象</view>
              <view class="right">{{goodsInfo.applicable_objects}}</view>
            </view>
            <view class="item">
              <view class="left">重量</view>
              <view class="right">{{goodsInfo.weight}}</view>
            </view>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters,
    createNamespacedHelpers
  } from 'vuex'
  const {
    mapState: mapStateUser,
    mapMutations: mapMutationsUser
  } = createNamespacedHelpers("user")
  const {
    mapState: mapStateCart,
    mapMutations: mapMutationsCart
  } = createNamespacedHelpers("cart")
  import shareMix from '@/mixins/share-app.js'
  import phoneMix from '@/mixins/get-phone.js'

  export default {
    mixins: [shareMix, phoneMix], // 导入公共js
    data() {
      return {
        goods_id: '',
        goods_stock: '',
        goods_img: '',
        weight: '',
        goodsInfo: {},
        is_collect: false,
        num: 0,
        goods: {}
      };
    },
    computed: {
      ...mapStateUser(['token']),
      ...mapGetters('cart', ['total']),
    },
    watch: {
      total: {
        handler(newVal) {
          this.num = newVal
        }
      }
    },
    onShow() {},
    onLoad(option) {
      this.num = this.total
      this.goods_id = option.id
      this.weight = option.weight
      this.goods_stock = option.goods_stock;
      this.goods_img = option.goods_img;

      this.getGoodsDetail();
      this.collectCheck();
    },
    computed: {
      ...mapStateCart(['cart_list']),
    },
    methods: {
      ...mapMutationsCart(['addToCart', 'updateGoodsCount', 'undateGoodsState', 'updateAllChecked']),
      ...mapMutationsUser(['undateToken', 'updateUserInfo']),
      handleContact(e) {
        console.log(e)
      },
      // 立即购买
      showPopup() {
        if (!this.checkStock()) {
          return
        }
        this.goods.goods_count = 1;
        this.$refs.popup.open();
      },
      //下单
      onSettle() {
        if (!this.checkStock()) {
          return
        }
        this.addToCart(this.goods);
        this.updateGoodsCount(this.goods);
        this.updateAllChecked(false);
        this.goods.is_checked = true;
        this.undateGoodsState(this.goods);
        this.$refs.popup.close();
        uni.navigateTo({
          url: `/pages/settle/settle?goods=${JSON.stringify(this.goods)}`
        })
      },

      addToCartHandler_b() {
        if (!this.checkStock()) {
          return
        }
        this.goods.goods_count = 1;
        this.$refs.popup_addCar.open();
      },

      addToCartHandler() {
        if (!this.checkStock()) {
          return
        }
        const goods = {
          goods_id: this.goods_id,
          goods_name: this.goodsInfo.name,
          goods_intro: this.goodsInfo.introduction,
          goods_img: uni.$baseUrl1 + this.goods_img,
          price: this.goodsInfo.price,
          market_price: this.goodsInfo.market_price,
          goods_count: this.goods.goods_count,
          weight: this.weight,
          is_checked: true,
        }
        this.addToCart(goods);
        uni.$showMsg("添加成功~");
        this.$refs.popup_addCar.close()
      },

      checkStock() {
        if (this.goods_stock == 0) {
          uni.$showMsg('宝贝售空了,隔段时间再来看看吧');
          return false
        } else {
          return 1
        }
      },

      // 点击收藏
      async collectChanged() {
        const mobile = JSON.parse(uni.getStorageSync('userInfo')).mobile
        const collect_list = {
          phone_id: mobile,
          sku_id: this.goods_id
        }
        if (!this.is_collect) { // 收藏
          var {
            data: res
          } = await uni.$http.put(`user_collect/`, {
            collect_list
          })
        } else { // 取消
          var {
            data: res
          } = await uni.$http.delete(`user_collect/`, {
            collect_list
          })
        }

        if (res.code !== 200) return uni.$showMsg(res.msg)
        uni.$showMsg(res.msg)
        this.is_collect = !this.is_collect
      },

      // 收藏状态
      async collectCheck() {
        if (!this.token) return
        const mobile = JSON.parse(uni.getStorageSync('userInfo')).mobile
        const {
          data: res
        } = await uni.$http.get(`user_collect_true/${mobile}/${this.goods_id}/`)
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        this.is_collect = res.flag
      },

      // 商品详情
      async getGoodsDetail() {
        const {
          data: res
        } = await uni.$http.get(`sku_detail/${this.goods_id}/`);
        if (res.code !== 200) return uni.$showMsg(res.msg);

        res.lists[0].de_image = res.lists[0].de_image.filter(item => item);
        console.log(res.lists[0].de_image)
        res.lists[0].de_image = res.lists[0].de_image.map(item => {
          return uni.$baseUrl1 + item
        })
        res.lists[0].image = res.lists[0].image.map(item => {
          return uni.$baseUrl1 + item
        })

        this.goodsInfo = res.lists[0];
        this.goods = {
          goods_id: this.goods_id,
          goods_name: this.goodsInfo.name,
          goods_intro: this.goodsInfo.introduction,
          goods_img: uni.$baseUrl1 + this.goods_img,
          price: this.goodsInfo.price,
          market_price: this.goodsInfo.market_price,
          goods_count: 1,
          weight: this.weight,
          is_checked: true,
        }
        uni.setNavigationBarTitle({
          title: this.goodsInfo.name,
          complete(err) {
            console.log(err);
          }
        })
      },

      numberChangeHandler(e) {
        this.goods.goods_count = e.goods_count;
      },

      gotoCart() {
        uni.switchTab({
          url: '/pages/cart/cart'
        })
      },

      // 服务说明 弹出层
      showServePopup(type) {
        if (type === 1) {
          this.$refs.popup1.open('top')
        } else {
          this.$refs.popup2.open('top')
        }
      },

      // 跳转到全部评价页面
      gotoComments() {
        let goods_id = 2
        uni.navigateTo({
          url: '/subpkg/comments_list/comments_list?id=' + goods_id
        })
      },
      previewDetailImg(index) {
        let de_image = this.goodsInfo.de_image;

        uni.previewImage({
          urls: de_image,
          current: de_image[index],
          fail(err) {
            console.log(err)
          }
        })
      },
      previewSwiperImg(index) {
        let image = this.goodsInfo.image;

        uni.previewImage({
          urls: image,
          current: image[index],
          fail(err) {
            console.log(err)
          }
        })

      }
    },

  }
</script>

<style lang="scss">
  @import '@/static/iconfont/iconfont.css';

  .container {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .goods_detail-page {
    background-color: #F6F6F6;
    padding-bottom: 50px;
  }

  swiper {
    width: 100%;
    height: 750rpx;
  }

  .pic {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F6F6F6;
    width: 750rpx;
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }

  .text-box {
    display: flex;
    justify-content: space-between;
    padding: 20px 14px 14px;
    background-color: #FFFFFF;

    .text-left {
      .title {
        padding-bottom: 2px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #000104;
      }

      .intro {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #C0C8D3;
      }

      .price-col {
        .icon {
          font-size: 11px;
          font-weight: bold;
          color: #294D7C;
        }

        .price {
          font-size: 26px;
          font-family: DIN;
          font-weight: bold;
          color: #294D7C;
        }

        image {
          margin-left: 3px;
          width: 29px;
          height: 13px;
        }

        .price-dis {
          margin-left: 20rpx;
          font-size: 16rpx;
          font-family: DIN;
          font-weight: 500;
          color: #C0C8D3;

          text {
            font-size: 32rpx;
            text-decoration: line-through
          }
        }
      }
    }

    .icon-right {
      display: flex;
      justify-content: space-between;
      width: 110rpx;
      height: 40rpx;

      &::before {
        content: '';
      }

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        padding: 0;
        background-color: transparent;

        &::after {
          content: '';
          border: 0;
          border-radius: 0;
          width: 0;
          height: 0;
        }

        image {
          width: 100%;
          height: 100%;
        }
      }

      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;


        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .serve-box {
    height: 80px;
    margin: 10px 0;
    background-color: #FFFFFF;

    .serve-item {
      height: 50%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 15px;
      padding-right: 10rpx;

      >view {
        display: flex;
        align-items: center;
      }

      .title {
        // margin-right: 20rpx;
        font-size: 28rpx;
        color: #b5b5b5;
      }

      .text {
        // flex: 1;
        display: flex;
        align-items: center;
        // width: 100%;

        .text-item {
          display: flex;
          align-items: center;
          // margin-right: 20rpx;
          margin-left: 20rpx;

          .iconfont {
            // margin-right: 5px;
            font-size: 28rpx;
            color: tomato;
          }

          text {
            padding-left: 6rpx;
            font-size: 28rpx;
            color: #777;
          }
        }
      }
    }

  }

  .comment {
    height: 284rpx;
    margin-top: 20rpx;
    background: #FFFFFF;

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 30rpx;

      .info-left {
        // height: 21px;
        font-size: 30rpx;
        font-weight: bold;
        color: #000104;
      }

      .info-right {
        font-size: 13px;
        font-weight: 500;
        color: #C0C8D3;

        .uni-icons {
          margin-left: 6rpx;
        }
      }
    }

    .comment-list {
      white-space: nowrap;
      width: 100%;
      margin-right: 30rpx;

      .comment-item {
        display: inline-block;
        width: 570rpx;
        height: 164rpx;
        margin-left: 30rpx;
        padding: 30rpx 20rpx 30rpx 30rpx;
        box-sizing: border-box;
        background: #F6F6F6;
        border-radius: 8rpx;

        .user {
          display: flex;
          align-items: center;

          .avatar {
            width: 30rpx;
            height: 30rpx;
            margin-right: 8rpx;
            border-radius: 50%;
            overflow: hidden;

            image {
              width: 30rpx;
              height: 30rpx;
            }
          }

          text {
            font-size: 24rpx;
            font-weight: bold;
            color: #000104;
          }
        }

        .comment-text {
          float: right;
          width: 482rpx;
          height: 70rpx;
          margin-top: 10rpx;
          font-size: 12px;
          font-weight: 500;
          color: #8F99A7;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          white-space: normal !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }

      .comment-item:last-child {
        margin-right: 30rpx;
      }
    }

  }

  .details {
    margin-top: 20rpx;

    .title {
      padding: 26rpx 0;
      // margin-bottom: 10px;
      text-align: center;
      font-size: 24rpx;
      font-weight: 500;
      color: #8F99A7;

      background-color: #FFFFFF;
    }

    .pics {
      width: 100%;

      image {
        width: 100%;
      }
    }
  }

  // 售空
  .sale-out {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #FFFFFF;
    background-color: #777;
    opacity: 0.9;
  }

  // 商品导航
  .goodsnav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FFFFFF;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    .goods-nav {
      position: fixed;
      left: 50px;
      right: 0;
      bottom: 0;
      bottom: constant(safe-area-inset-bottom);
      bottom: env(safe-area-inset-bottom);
      display: flex;
      align-items: center;
      height: 50px;
      font-size: 12px;
      color: #646566;
      background-color: #FFFFFF;

      .cart {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50px;
        padding-top: 2px;
        padding-left: 8px;

        .iconfont {
          margin-bottom: 2px;
        }

        uni-badge {
          position: absolute;
          right: 0;
          top: 0;
          transform: translateY(-20%);
        }
      }

      .btns {
        display: flex;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;

        button {
          width: 50%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: #FFFFFF;
          border-radius: 0;

          &::after {
            border: 0;
          }
        }

        .btn1 {
          background-color: #294D7C;
          border-radius: 20px 0 0 20px;
        }

        .btn2 {
          background-color: #ffa424;
          border-radius: 0 20px 20px 0;
        }
      }
    }
  }

  .kefu {
    position: fixed;
    bottom: 0;
    left: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    height: 50px;
    width: 50px;
    background-color: #FFFFFF;
    box-sizing: border-box;

    button {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 0;
      padding-left: 10px;
      padding-top: 5px;
      font-size: 12px;
      color: #646566;
      background-color: #FFFFFF;
      border-radius: 0;

      &::after {
        border: 0;
      }

      .icon-kefu1 {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 22px;

        &::before {
          display: flex;
          align-items: center;
          height: 16px;
          // margin-top: -200px !important;
        }
      }

      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 16px;
      }
    }
  }

  .uni-goods-nav {
    position: fixed;
    left: 50px;
    right: 0;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
  }

  // 服务说明 弹出层
  .popup-box {
    height: 80vh;
    border-radius: 10px;
    background-color: #FFFFFF;

    .title {
      text-align: center;
      line-height: 50px;
      border-bottom: 1px solid #f4f4f4;
    }

    // 服务说明
    .serve-intro {
      padding: 0 20px;

      .item {
        display: flex;
        margin-top: 20px;

        .left {
          margin-top: 2px;
          margin-right: 5px;
        }

        .right {
          .right1 {
            color: #444;
            font-size: 28rpx;
          }

          .right2 {
            margin-top: 5px;
            color: #666;
            font-size: 24rpx;
          }
        }
      }

      .iconfont {
        color: tomato;
      }
    }

    // 产品参数
    .parameter {
      padding: 10px 10px 40px;

      .item {
        display: flex;
        align-items: center;
        // margin-bottom: 20px;
        // margin: 10px 0 20px;
        margin-top: 50px;
        font-size: 16px;

        .left {
          width: 20%;
          margin-right: 20px;
          color: #b5b5b5;
        }

        .right {
          color: #444;
        }
      }
    }
  }

  .settle-box {
    min-height: 70vh;
    box-sizing: border-box;
    padding: 30rpx 0 100rpx;
    margin-top: 10rpx;
    background-color: #FFFFFF;
    border-radius: 20rpx 20rpx 0 0;
    overflow: hidden;
    position: relative;

    button {
      position: absolute;
      width: 95%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      bottom: 20rpx;
      left: 50%;
      transform: translateX(-50%);
      color: #FFFFFF;
      background-color: #ffa424;
      border-radius: 25px;
      font-size: 32rpx;

      &::after {
        border: 0;
      }
    }

    &.addcar {
      button {
        background-color: #294D7C;
      }
    }

  }
</style>
