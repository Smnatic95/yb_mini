<template>
  <view class="page">
    <view class="mask">
      <image src="https://7n.oripetlife.com/bg.png"></image>
    </view>

    <view class="user">
      <view class="top">
        <view class="user1">
          <view class="avatar-box">
            <view class="avatar">
              <open-data v-if="token&&!userInfo.avatarUrl" type="userAvatarUrl" mode="aspectFill"></open-data>
              <image v-else :src="userInfo.avatarUrl"></image>
            </view>
          </view>
          <view class="info-box">
            <open-data v-if="token" type="userNickName" style="color: #FFFFFF;"></open-data>
            <view class="name" v-else-if="userInfo.nickName">{{userInfo.nickName}}</view>
            <view class="name" v-else>注册/登录</view>
            <view class="mobile">{{userInfo.mobile}}</view>
          </view>
        </view>
        <view class="sign" @click="gotoSign">
          <image src="/static/images/sign.png"></image>
          <view>
            签到
            <uni-icons type="arrowright" size="16" color="#FFA424"></uni-icons>
          </view>
        </view>
      </view>

      <view class="center">
        <view @click="viewNavigate('/mypkg/balance/balance')">
          <view class="num">{{userInfo.money_vip?userInfo.money_vip:'0'}}</view>
          <view class="type">余额</view>
        </view>
        <view @click="viewNavigate('/mypkg/integral/integral')">
          <view class="num">{{userInfo.bonus_money?userInfo.bonus_money:'0'}}</view>
          <view class="type">积分</view>
        </view>
        <view @click="viewNavigate('/mypkg/card/card')">
          <view class="num">{{userInfo.year_sum?userInfo.year_sum:'0'}}</view>
          <view class="type">年卡</view>
        </view>
      </view>

      <view class="vip-box">
        <block v-if="!userInfo.vip_active">
          <text>未开通会员</text>
          <view @click="gotoVip">立即开通<uni-icons type="arrowright" size="12" color="#905100"></uni-icons>
          </view>
        </block>
        <block v-else>
          <text>已开通会员</text>
          <view @click="gotoVip">会员权益<uni-icons type="arrowright" size="12" color="#905100"></uni-icons>
          </view>
        </block>
      </view>
      <!-- VIP -->
      <!-- <view class="bottom" @click="gotoBalance">
    <view class="left">
      <image src="/static/images/price.png"></image>
      <text class="balance">520.00</text>
      <view class="text">余额
        <uni-icons type="arrowright" size="12" color=""></uni-icons>
      </view>
    </view>
    <view class="right">
      <text>联系客服充值</text>
    </view>
  </view> -->
      <!-- 非VIP -->
      <!-- <view class="bottom">
    <image src="/static/images/vip.png"></image>
    <view class="right" @click="gotoRecharge">
      <text>联系客服开通</text>
    </view>
  </view> -->

    </view>

    <!-- <view> -->
    <view class="order-box">
      <view class="title">
        <text class="left">我的订单</text>
        <view class="right" @click="gotoOrders(2)">查看全部订单
          <uni-icons type="arrowright" size="14" color=""></uni-icons>
        </view>
      </view>
      <uni-grid :column="5" :showBorder="false" :square="false" highlight>
        <uni-grid-item>
          <view class="grid-item" @click="gotoOrders(0)">
            <image src=/static/images/stay.png></image>
            <text>待支付</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item" @click="gotoOrders(1)">
            <image src=/static/images/card.png></image>
            <text>待发货</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item" @click="gotoOrders(2)">
            <image src=/static/images/che.png></image>
            <text>待收货</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item" @click="gotoOrders(3)">
            <image src=/static/images/xinxi.png></image>
            <text>已完成</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item" @click="gotoOrders(4)">
            <image src=/static/images/qian.png></image>
            <text>退款/退货</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <view class="pet-box">
      <view class="title">
        <view class="left">我的宠物</view>
        <view class="right" @click="gotoAddPet()" v-show="petList.length>0"> + 添加宠物</view>
      </view>

      <swiper :indicator-dots="true" autoplay circular :interval="3000" :duration="1000" v-if="petList.length>0">
        <swiper-item v-for="(item,i) in petList" :key='i'>
          <view class="pet-info" @click="gotoAddPet(item.pet_id)">
            <view class="avatar">
              <image :src="item.avatar"></image>
            </view>
            <text class="name">{{item.name}}</text>
          </view>
          <!-- <view class="remind">
            <view class="left" @click="gotoRecord('vaccine')">
              距下次免疫<text>56</text>天
              <uni-icons type="arrowright" size="14" color="#929292"></uni-icons>
            </view>
            <view class="right" @click="gotoRecord('worm')">
              距下次驱虫<text>56&nbsp;</text>天
              <uni-icons type="arrowright" size="14" color="#929292"></uni-icons>
            </view>
          </view> -->
          <view class="remind">
            <view class="left">
              生日：{{item.birthday}}
            </view>
            <view class="right">
              体重：{{item.weight}}kg
            </view>
          </view>
        </swiper-item>
      </swiper>

      <view class="addpet-btn" v-else>
        <button @click="gotoAddPet()">+ 添加宠物</button>
      </view>

    </view>

    <view class="serve-box">
      <view class="title">我的服务</view>
      <uni-grid :column="4" :showBorder="false" :square="false" highlight>
        <uni-grid-item>
          <view class="grid-item" @click="gotoCard">
            <image src='../../static/images/services/nianka.png'>
            </image>
            <text>我的年卡</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item" @click="gotoIntegral">
            <image src='../../static/images/services/jifen.png'>
            </image>
            <text>我的积分</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item" @click="gotoBalance">
            <!-- <button class="phone-btn"> -->
            <image src='../../static/images/services/banlance.png'>
            </image>
            <text>我的余额</text>
            <!-- </button> -->
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item" @click="gotoCoupons">
            <image src='../../static/images/services/copoun.png'>
            </image>
            <text>优惠券</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item" @click="gotoPet">
            <image src='/static/images/services/pet.png'>
            </image>
            <text>我的宠物</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item" @click="gotoAddress">
            <image src='/static/images/services/address.png'>
            </image>
            <text>收货地址</text>
          </view>
        </uni-grid-item>
        <uni-grid-item>
          <view class="grid-item" @click="gotoCollect">
            <image src='/static/images/services/collect.png'>
            </image>
            <text>我的收藏</text>
          </view>
        </uni-grid-item>
        <!-- <uni-grid-item>
          <view class="grid-item" @click="gotoEditUser">
            <image src='https://demo40.crmeb.net/uploads/attach/2020/11/20201117/1dfb2b9c571e71c044c5ec60f551b535.png'>
            </image>
            <text>个人资料</text>
          </view>
        </uni-grid-item> -->
        <!-- <uni-grid-item>
          <view class="grid-item">
            <image src='https://demo40.crmeb.net/uploads/attach/2020/11/20201117/1dfb2b9c571e71c044c5ec60f551b535.png'>
            </image>
            <text>订阅设置</text>
          </view>
        </uni-grid-item> -->
        <uni-grid-item>
          <view class="grid-item" @click="logOut">
            <image src='/static/images/services/exit.png'>
            </image>
            <text>退出登录</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <!-- logout popup -->
    <!-- <button @click="open">打开弹窗</button> -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog message="成功消息" content='确认退出？' :duration="2000" :before-close="true" @close="close"
        @confirm="confirm">确认退出？</uni-popup-dialog>
    </uni-popup>

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    createNamespacedHelpers
  } from 'vuex'
  const {
    mapState: mapStateUser,
    mapMutations: mapMutationsUser
  } = createNamespacedHelpers('user')
  const {
    mapState: mapStatePet,
    // mapMutations:mapMutationsUser
  } = createNamespacedHelpers('pet')

  export default {
    name: "my-islogin",
    data() {
      return {};
    },
    computed: {
      ...mapStateUser(['token', 'userInfo']),
      ...mapStatePet(['petList']),
    },
    methods: {
      ...mapMutationsUser(['undateToken', 'updateUserInfo', 'reLoadUserInfo']),
      ...mapMutations('cart',['reloadCart']),
      ...mapMutations('pet',['updatePetList']),
      // 退出登录
      logOut() {
        this.$refs.popup.open('top')
      },
      close() {
        this.$refs.popup.close()
      },
      confirm(value) {
        try {
          const {
            keys: storageKeyList
          } = uni.getStorageInfoSync();
          let initKeys = ['__DC_STAT_UUID', 'isIphoneX', 'code', 'areas', 'goods_list'],
            deleteKeys = storageKeyList.filter(item1 => !initKeys.some(item2 => item2 == item1));
           
           console.log(deleteKeys) 
            
          deleteKeys.forEach((key) => {
            console.log(key);
            uni.removeStorageSync(key);
          })
          
          this.reLoadUserInfo();
          this.reloadCart();
          this.updatePetList([]);
          uni.$showMsg('退出成功！');
          this.$refs.popup.close();
          
        } catch (e) {
          console.log(e);
        }
      },

      // 跳转修改用户信息
      gotoEditUser() {
        uni.navigateTo({
          url: '/components/edit-user/edit-user'
        })
      },
      gotoOrders(val) {
        uni.navigateTo({
          url: '/subpkg/orders/orders?index=' + val
        })
      },
      gotoIntegral() {
        uni.navigateTo({
          url: '/mypkg/integral/integral'
        })
      },
      gotoBalance() {
        uni.navigateTo({
          url: '/mypkg/balance/balance'
        })
      },
      gotoCard() { // 年卡
        uni.navigateTo({
          url: '/mypkg/card/card'
        })
      },
      gotoSign() {
        uni.navigateTo({
          url: '/mypkg/sign/sign'
        })
      },
      gotoPet() {
        uni.navigateTo({
          url: '/mypkg/peta/peta'
        })
      },
      gotoAddPet(pet_id) {
        if (pet_id) {
          uni.navigateTo({
            url: '/mypkg/add_pet/add_pet?pet_id=' + pet_id
          })
        } else {
          uni.navigateTo({
            url: '/mypkg/add_pet/add_pet'
          })
        }
      },
      gotoRecord(type) {
        uni.navigateTo({
          url: '/mypkg/record/record?type=' + type
        })
      },
      gotoAddress() {
        uni.navigateTo({
          url: '/mypkg/address/address'
        })
      },
      gotoVip() {
        uni.navigateTo({
          url: '/mypkg/vip/vip'
        })
      },
      gotoCoupons() {
        uni.navigateTo({
          url: '/mypkg/coupons/coupons'
        })
      },
      gotoCollect() {
        uni.navigateTo({
          url: '/mypkg/collect/collect'
        })
      }

    }
  }
</script>


<style lang="scss">

</style>
