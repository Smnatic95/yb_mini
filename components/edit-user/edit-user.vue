<template>
  <view class="page">
    <uni-forms :value="userInfo" ref="form">

      <uni-forms-item label="头像" name="avatar">
        <view class="avatar" @click="chosseImg">
          <image v-if="userInfo.avatar" :src="userInfo.avatar" mode=""></image>
          <open-data v-else type="userAvatarUrl" mode="aspectFill"></open-data>
        </view>
      </uni-forms-item>

      <uni-forms-item label="名字" name="username">
        <uni-easyinput type="text" v-model="userInfo.username" placeholder="请输入姓名" placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="性别" name="sex">
        <open-data type="userGender"></open-data>
       <picker @change="sexCange" v-model="userInfo.sex" :range="sexArr"
          :style="{color:userInfo.sex==3?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{sexArr[userInfo.sex]}}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item label="手机号码" name="mobile">
        <uni-easyinput type="number" v-model="userInfo.mobile" placeholder="请输入手机号" placeholder-style="color:#C0C8D3" />
      </uni-forms-item>


      <!--  <uni-forms-item label="微信号" name="wx">
        <uni-easyinput type="text" v-model="userInfo.wx" placeholder="请输入微信号" placeholder-style="color:#C0C8D3" />
      </uni-forms-item> -->


      <button @click="editUser">修改</button>

      <open-data type="userGender"></open-data>

    </uni-forms>
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
        userInfo: JSON.parse(uni.getStorageSync('userInfo')),
        sexArr: ['', '男', '女', '未知'],
      };
    },
    onLoad(option) {},
    computed: {
      // ...mapState('user', ['userInfo'])
    },
    methods: {
      ...mapMutations('user', ['updateUserInfo']),

      // 修改头像
      chosseImg() {
        uni.chooseImage({
          count: 1, //限制图片上传的数量,做多9张
          success: res => { //上传成功的回调
            this.userInfo.avatar = res.tempFilePaths
          }
        })
      },
      // 修改性别
      sexCange(e) {
        this.userInfo.sex = e.target.value
      },
      // 点击修改
      editUser() {
        this.updateUserInfo(this.userInfo)
      }
    }
  }
</script>

<style lang="scss">
  .page {
    padding-top: 20rpx;
  }

  .uni-forms-item {
    background-color: #FFFFFF;
    border-bottom: 1px solid #F6F6F6;

    .uni-forms-item__inner {
      padding: 30rpx !important;
    }

    .uni-forms-item__label .label-text.data-v-61dfc0d0 {
      font-size: 30rpx;
      font-weight: bold;
      color: #000104;
    }

    .uni-easyinput__content-input.data-v-abe12412 {
      font-size: 30rpx;
      text-align: right;
    }

    .is-input-border {
      border: none !important;
    }

    picker {
      display: flex;
      align-items: center;
      padding-left: 18rpx;
      height: 100%;
      // width: 100% !important;
      font-size: 30rpx;
      // color: #C0C8D3;

      .uni-input {
        height: 100%;
        width: 550rpx !important;
        text-align: right;
      }
    }
  }

  .uni-forms-item__content {
    display: flex;
    justify-content: flex-end;
  }

  .avatar {
    width: 112rpx;
    height: 112rpx;
    margin: -20rpx 0;
    border-radius: 50%;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }
  }

  uni-file-picker {
    width: 100%;
    height: 100%;
  }


  button {
    height: 100rpx;
    margin-top: 30rpx;
    line-height: 100rpx;
    font-size: 30rpx;
    font-weight: bold;
    // border: none;
    color: #294D7C;
    background: #FFFFFF;
    border-radius: 0;
  }

  button::after {
    border: none;
  }
</style>
