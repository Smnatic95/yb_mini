<template>
  <view class="page">
    <uni-forms :value="user_address" ref="form">

      <uni-forms-item label="收货人" name="receiver">
        <uni-easyinput type="text" v-model="user_address.receiver" placeholder="请输入收货人"
          placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="手机号" name="mobile">
        <uni-easyinput type="number" v-model="user_address.mobile" placeholder="请输入手机号"
          placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="所在地区" name="address">
        <uni-data-picker v-model="user_address.address" :localdata="areas" popup-title="请选择地区" @change="areaChange">
        </uni-data-picker>
      </uni-forms-item>

      <uni-forms-item label="街道地址" name="detail_address">
        <uni-easyinput type="text" v-model="user_address.detail_address" placeholder="请输入街道地址"
          placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="是否默认" name="type" v-show="pageTitle==='修改地址'">
        <label class="radio" @click="deaultChange">
          <image v-if="!user_address.is_default" src="/static/images/default.png" mode=""></image>
          <image v-else src="/static/images/default_active.png" mode=""></image>
        </label>
      </uni-forms-item>

    </uni-forms>

    <button @click="submitForm">{{pageTitle==='修改地址'?'修改':'添加'}}</button>

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
        pageTitle: '修改地址',
        user_address: '',
        is_checked: true,
      };
    },
    computed: {
      ...mapState('address', ['areas', 'address_list']),
    },
    onLoad(option) {
      switch (option.type) {
        case 'edit':
          this.pageTitle = '修改地址'
          break;
        case 'add':
          this.pageTitle = '添加地址'
          break;
      }
      uni.setNavigationBarTitle({
        title: this.pageTitle
      })

      // console.log(this.areas)

      this.user_address = JSON.parse(uni.getStorageSync('user_address') || "{}")

      // this.getArea()
    },
    methods: {
      ...mapMutations('address', ['addAddress', 'updateAddress']),

      // 默认地址
      deaultChange() {
        if (this.pageTitle === '修改地址') {
          this.user_address.is_default = !this.user_address.is_default
        } else {

        }
      },
      areaChange(e) {
        // console.log(e.detail.value)
        this.user_address.area = e.detail.value
        console.log(this.user_address)
      },



      // 提交
      submitForm() {
        // 校验
        const form = {
          ...this.user_address
        }
        // console.log(form)
        if (!form.receiver || !form.mobile || !(form.area || form.address) || !form.detail_address) return uni.$showMsg(
          '地址信息填写不完整')
        // if (form.mobile[0] != 1 || form.mobile.length !== 11) return uni.$showMsg('手机号格式不正确')

        if (this.pageTitle === '修改地址') {
          const address = {
            id: form.id,
            receiver: form.receiver,
            mobile: form.mobile,
            // address: form.address,
            // area: form.area,
            address: form.address,
            detail_address: form.detail_address,
            is_default: form.is_default,
          }
          this.updateAddress(address)
        } else {
          // form.address = []
          // form.area.forEach(item => {
          //   form.address.push(item.value)
          // })
          const address = {
            id: this.address_list.length + 1,
            receiver: form.receiver,
            mobile: form.mobile,
            // address: form.address,
            // area: form.area,
            address: form.area,
            detail_address: form.detail_address,
            is_default: form.is_default ? form.is_default : false,
          }
          // return  console.log(form)
          // console.log(address)
          // return
          this.addAddress(address)
        }
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
    }

    .is-input-border {
      border: none !important;
    }

    .input-value-border {
      border: unset !important;
    }

    .input-value.data-v-3ed22fe0,
    .uni-data-tree.data-v-3ed22fe0 {
      font-size: 30rpx !important;
    }

    .placeholder.data-v-3ed22fe0 {
      color: #c0c8d3;
      padding-left: 5px;
    }

    .radio {
      image {
        width: 45px;
        height: 20px;
        margin-top: 8px;
        margin-left: 10px;
      }
    }
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
