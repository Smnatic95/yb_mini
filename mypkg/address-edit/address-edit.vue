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
        user_address: {},
        is_checked: true,
      };
    },
    computed: {
      ...mapState('address', ['areas', 'address_list', 'default_address_id']),
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
      // 修改地址数据
      this.user_address = JSON.parse(uni.getStorageSync('user_address') || "{}")
    },

    methods: {
      ...mapMutations('address', ['addAddress', 'updateAddress', 'editAddress', 'updateDefaultAddress']),

      // 提交
      async submitForm() {
        // 校验
        const form = {
          ...this.user_address
        }
        if (!form.receiver || !form.mobile || !(form.area || form.address) || !form.detail_address) return uni
          .$showMsg(
            '地址信息填写不完整')
        if (form.mobile[0] != 1 || form.mobile.length !== 11) return uni.$showMsg('手机号格式不正确')

        // console.log(form)
        if (this.pageTitle === '修改地址') {
          console.log(form)
          // 修改地址
          const address_list = {
            receiver: form.receiver,
            mobile: form.mobile,
            address: [form.address[0].value, form.address[1].value, form.address[2].value, ],
            detail_address: form.detail_address,
          }
          console.log(address_list)
          const {
            data: res
          } = await uni.$http.put(`address/${form.address_id}/`, {
            address_list
          })
          if (res.code !== 200) return uni.$showMsg(res.msg)
          uni.$showMsg(res.msg)

          const address = {
            ...address_list
          }
          address.address_id = form.address_id
          address.address = form.address
          this.editAddress(address)
          setTimeout(() => {
            uni.navigateBack(-1)
          }, 1500)
        } else {
          // 添加地址
          const address_list = {
            phone_id: JSON.parse(uni.getStorageSync('userInfo')).mobile,
            receiver: form.receiver,
            mobile: form.mobile,
            address: [form.area[0].value, form.area[1].value, form.area[2].value],
            detail_address: form.detail_address
          }
          const {
            data: res
          } = await uni.$http.post(`address_create/`, {
            address_list
          })
          if (res.code !== 200) return uni.$showMsg(res.msg)
          uni.$showMsg(res.msg)

          const address = {
            ...address_list
          }
          address.address = form.area
          this.addAddress(address)
          setTimeout(() => {
            uni.navigateBack(-1)
          }, 1500)
        }
      },

      // 默认地址
      async deaultChange() {
        // if (this.pageTitle === '修改地址') {
        if (this.user_address.is_default) return uni.$showMsg('默认地址不能为空')

        this.user_address.is_default = !this.user_address.is_default

        const id = this.user_address.address_id
        const {
          data: res
        } = await uni.$http.get(`address_default/${id}/`)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        uni.$showMsg(res.msg)
        this.updateDefaultAddress(id)
        setTimeout(() => {
          uni.navigateBack(-1)
        }, 1500)
        // } else {

        // }
      },

      areaChange(e) {
        console.log(e.detail.value)
        this.user_address.area = e.detail.value
        this.user_address.address = e.detail.value
        // console.log(this.user_address)
      },

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
