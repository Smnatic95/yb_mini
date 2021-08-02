<template>
  <view class="page">

    <view class="top-box">
      <view class="view">
        <view class="avatar">
          <view class="pic">
            <open-data type="userAvatarUrl" mode="aspectFill"></open-data>
          </view>
        </view>
        <view class="text">
          <view class="title">已连续签到 {{total}} 天</view>
          <view class="intro">明日签到可获得 {{next_integral}} 积分</view>
        </view>
      </view>
      <view class="integral">
        <image src="/static/images/sign.png" mode=""></image>
        <text class="text2">{{bonus}}</text>
        <!-- <uni-icons type="arrowright" size="12" color="#FFA424"></uni-icons> -->
      </view>
    </view>

    <view class="sign-box">
      <view class="clearfix">
        <view class="sign-item" v-for="(item,i) in signList" :key='i'>
          <view class="date" v-if="item.num==0">{{i+1}}</view>
          <view class="date active" v-else>{{i+1}}</view>
          <!-- <image src="/static/images/sign.png" v-else></image> -->
          <!-- <view class="code">+{{is_vip?'15':'5'}}</view> -->
        </view>
      </view>

      <view class="rules-box">
        <view class="title">签到规则</view>
        <view class="text">1.非会员：每日签到可得 2 积分，当月连续签到不中断：第 10 天为 20 积分、第 20 天为 50 积分、当月最后一天为 100 积分</text>
          <view class="text text1">2.会员：每日签到可得 2倍 积分</text>
            <view class="text text1">3.若签到中断则重新计算</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 弹出层 -->
    <uni-popup ref="popup" type="center">
      <sign-popup :day="day" :integral='integral' :total='total' :next_integral='next_integral'></sign-popup>
    </uni-popup>


  </view>
</template>

<script>
  import signPopup from '../sign-popup/sign-popup.vue'

  import {
    mapMutations,
    createNamespacedHelpers
  } from 'vuex'
  const {
    mapState: mapStateUser,
    mapMutations: mapMutationsUser,
  } = createNamespacedHelpers('user')
  const {
    mapState: mapStateCart,
    mapMutations: mapMutationsCart
  } = createNamespacedHelpers('cart')

  export default {
    components: {
      signPopup
    },
    data() {
      return {
        // bonus: JSON.parse(uni.getStorageSync('userInfo')).bonus_money,
        // dateList: ['第1天', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天', ],
        day: 0, // 当前天数
        integral: 0, // 今日签到积分
        total: 0, // 连续签到天数
        total_day: 0, // 当天前总天数
        next_integral: 0,
        // signList: [],
      };
    },
    onLoad() {
      this.getSignHistory()
      // this.getUserInfo()
    },
    computed: {
      ...mapStateCart(['is_vip']),
      ...mapStateUser(['signList', 'userInfo']),
      bonus() {
        return this.userInfo.bonus_money
      }
    },
    methods: {
      ...mapMutationsUser(['updateSignList', 'updateSignStatus', 'updateUserInfo']),

      showPopup() {
        var date = new Date()
        var d = date.getDate()

        // 连续签到
        let arr = this.signList.filter((x, i) => i <= d - 1)
        arr = arr.reverse()
        console.log(arr)
        this.total_day = arr.length
        const idx = arr.findIndex((x, i) => i >= 1 && x.num == 0)
        console.log(idx)
        arr.splice(idx)
        console.log(arr)

        // if (this.signList[d - 1].num !== 0) {
        this.total = arr.length
        // } else {
        //   this.total = arr.length + 1
        // }

        this.day = d
        // if (this.total == this.total_day) {
          if (this.total == 10) {
            this.integral = this.is_vip ? 40 : 20
          } else if (this.total == 20) {
            this.integral = this.is_vip ? 100 : 50
          } else if (this.total == this.signList.length) { // 最后一天
            this.integral = this.is_vip ? 200 : 100
          } else {
            this.integral = this.is_vip ? 4 : 2
          }

          if (this.total == 9) {
            this.next_integral = this.is_vip ? 40 : 20
          } else if (this.total == 19) {
            this.next_integral = this.is_vip ? 100 : 40
          } else if (this.total == this.signList.length - 1) {
            this.next_integral = this.is_vip ? 200 : 100
          } else {
            this.next_integral = this.is_vip ? 4 : 2
          }
        // } else {
        //   this.integral = this.is_vip ? 4 : 2
        //   this.next_integral = this.is_vip ? 4 : 2
        // }

        // 已签到
        if (this.signList[d - 1].num !== 0) return
        this.onSign(d)
      },
      async onSign(d) {
        const mobile = JSON.parse(uni.getStorageSync('userInfo')).mobile
        const {
          data: res
        } = await uni.$http.post(`user_sign_in_day/`, {
          sign_list: {
            phone_id: mobile,
            parent_id: JSON.parse(uni.getStorageSync('parent_id')),
            num: this.integral
          }
        })
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)

        uni.$showMsg(res.msg)
        this.updateSignStatus(d)
        this.$refs.popup.open()
        this.getUserInfo()
      },
      // 更新用户信息
      async getUserInfo() {
        const {
          data: res
        } = await uni.$http.get(`user_phone/${this.userInfo.mobile}`)
        // console.log(res)
        this.updateUserInfo(res.user_list[0])
      },


      getDate() {
        var date = new Date()
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        var d = date.getDate()
        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d : d
        // console.log(y + '-' + m + '-' + d)
        return y + '-' + m + '-' + d
      },

      async getSignHistory() {
        const mobile = JSON.parse(uni.getStorageSync('userInfo')).mobile
        const {
          data: res
        } = await uni.$http.get(`user_sign_in/${mobile}/`)
        if (res.code !== 200) return
        this.updateSignList(res.sign_list)

        this.showPopup()
      },

    }
  }
</script>

<style lang="scss">
  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 372rpx;
    padding: 52rpx 30rpx 200rpx;
    background: #294D7C;
    box-sizing: border-box;

    .view {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      width: 120rpx;
      height: 120rpx;
      background: #FFFFFF;
      border-radius: 50%;

      .pic {
        width: 108rpx;
        height: 108rpx;
        border-radius: 50%;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }

    .text {
      margin-left: 15px;
      color: #FFFFFF;

      .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #FFFFFF;
      }

      .intro {
        font-size: 24rpx;
        font-weight: 500;
      }
    }

    .integral {
      display: flex;
      justify-content: space-around;
      align-items: center;
      // width: 170rpx;
      height: 60rpx;
      padding-left: 10px;
      padding-right: 5px;
      background: #FFFFFF;
      border-radius: 20px;

      image {
        width: 18px;
        height: 18px;
      }

      .text2 {
        font-size: 24rpx;
        font-weight: bold;
        padding: 0 10rpx;
        color: #FFA424;
      }
    }
  }

  .sign-box {
    position: absolute;
    top: 202rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 690rpx;
    // height: 700rpx;
    padding-left: 30rpx;
    padding-top: 15rpx;
    padding-bottom: 40rpx;
    background: #FFFFFF;
    border-radius: 8rpx;
    box-sizing: border-box;

    .sign-item {
      float: left;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 83rpx;
      height: 85rpx;
      margin-top: 15rpx;
      margin-right: 10rpx;
      padding: 5rpx 0;
      font-size: 26rpx;
      color: #333;
      // background: #F6F6F6;
      box-sizing: border-box;
      border-radius: 4px;

      .date {
        &.active {
          width: 46rpx;
          height: 46rpx;
          line-height: 46rpx;
          text-align: center;
          border-radius: 23rpx;
          background-color: #FFA424;
          // color: #FFA424;
          color: #FFFFFF;
        }
      }

      image {
        width: 50rpx;
        height: 50rpx;
      }

      .code {
        font-size: 20rpx;
        font-weight: 500;
        color: #294D7C;
      }

      // &:last-child {
      //   display: flex;
      //   flex-direction: row;
      //   width: 302rpx;

      //   image {
      //     width: 74rpx;
      //     height: 74rpx;
      //   }

      //   .right {
      //     display: flex;
      //     flex-direction: column;
      //     align-items: flex-end;
      //   }

      //   .code {
      //     margin-right: -5rpx;
      //     font-size: 32rpx;
      //   }
      // }

      // &.active {
      //   color: #FFA424;
      //   background: #FEE7D6;
      //   border-radius: 4px;

      //   .date {
      //     opacity: 0.54;
      //   }

      //   .code {
      //     color: #FFA424;
      //     opacity: 1;
      //   }
      // }
    }

    .clearfix::after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    .rules-box {
      padding-right: 30rpx;

      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #000104;
        padding-top: 40rpx;
        padding-bottom: 30rpx;
      }

      .text {
        font-size: 24rpx;
        font-weight: 500;
        color: #8F99A7;
      }

      .text1 {
        margin-top: 30rpx;
      }
    }




  }
</style>
