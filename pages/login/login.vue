<template>
  <view class="login-page">

  <!--  <view class="logo"></view>
    <view class="input-item">
      <input class="input" type="number" v-model="mobile" placeholder="请输入手机号" />
    </view>
    <view class="input-item">
      <input class="input" v-model="pwd" placeholder="请输入密码" :password="showPassword" />
      <text class="icon" :class="[!showPassword ? 'icon-eye' : '']" @click="showPwd">&#xe568;</text>
    </view> -->

    <view class="btn">
      <!-- <button type="default" @click="getUserProfile">登录</button> -->
      <button type="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">登录</button>
     
    </view>
  </view>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'

  export default {
    data() {
      return {
        mobile: '',
        pwd: '',
        showPassword: true,
      }
    },
    computed: {},
    onLoad() {},
    onReady() {},
    methods: {
      ...mapMutations('user', ['updateUserInfo']),

      async getPhoneNumber(e) {
        const [err, res] = await uni.login().catch(err => err)
        const res1 = await uni.$http.post('login/', {
          code: res.code
        })
        console.log(res1.data)
      
        console.log(e)
        // return
        // const [err, res] = await uni.login().catch(err => err)
        // console.log(res)
        // console.log(e.detail.errMsg)
        // console.log(e.detail.iv)
        // console.log(e.detail.encryptedData)
      },

      async getUserProfile(e) {
        const [err, res] = await uni.getUserProfile({
          desc: '授权登录'
        })
        // console.log(res)
        this.updateUserInfo(res.userInfo)
        // this.getToken(res)
      },

      async getToken(info) {
        console.log(info)
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        // 判断是否 uni.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // return  console.log(query)

        // 换取 token
        const {
          data: loginResult
        } = await uni.$http.post('login/', query)
        console.log(loginResult)
        // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
        // uni.$showMsg('登录成功')
      },


      showPwd() {
        this.showPassword = !this.showPassword
      },


    }
  }
</script>

<style lang="scss">
  .login-page {
    background-color: #F8F8F8;
    height: 100vh;
    padding: 0 20px;

    .logo {
      width: 150px;
      height: 150px;
      padding-top: 100rpx;
      margin: 0 auto;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .input-item {
      display: flex;
      padding: 8px 13px;
      flex-direction: row;
      flex-wrap: nowrap;
      // background-color: #FFFFFF;
      border-bottom: 1px solid #e6e6e6;

      .input {
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        padding: 0px;
        flex: 1;
        // background-color: #f8f8f8;
      }

      .icon {
        font-family: uniicons;
        font-size: 24px;
        font-weight: normal;
        font-style: normal;
        width: 24px;
        height: 24px;
        line-height: 50px;
        color: #999999;
      }

      .icon-eye {
        color: #007AFF;
      }
    }

    .btn {
      // margin: 10px;
      margin-top: 100rpx;

      button {
        color: #FFFFFF;
        background-color: #409eff;
        border-radius: 23px;
      }
    }

  }
</style>
