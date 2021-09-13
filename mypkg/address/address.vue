<template>
  <view class="page">

    <uni-notice-bar single="true" text="左滑可编辑地址"></uni-notice-bar>

    <uni-swipe-action>
      <uni-swipe-action-item v-for="(item,i) in address_list" :key='i'>
        <address-item :address='item' @change-address='addressCheckedHandler'></address-item>
        <template v-slot:right>
          <view class="slot-btns">
            <view class="edit" @click="editAddress(item)">
              <view class="iconfont icon-xiugai"></view>
            </view>
            <view class="remove" @click="deleteAddressHandler(item.address_id)">
              <uni-icons type="trash" size="20" color=""></uni-icons>
            </view>
          </view>
        </template>
      </uni-swipe-action-item>
    </uni-swipe-action>

    <view class="add-btn" @click="addAddress">
      <uni-icons type="plusempty" size="22" color="" />
      新增地址
    </view>

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
        type: 0,
        from: null,
      };
    },

    onLoad(option) {
      console.log(option);
      this.from = option.from;
      this.type = option.type;
    },
    onShow() {
      this.getAddressList();
    },

    computed: {
      ...mapState('address', ['address_list', 'default_address_id']),
    },

    methods: {
      ...mapMutations('address', ['delAddress', 'updateAddress', 'updateDefaultAddress']),

      // 跳转修改地址
      editAddress(address) {
        // console.log(address)
        if (address.address_id == this.default_address_id) {
          address.is_default = true
        } else {
          address.is_default = false
        }
        uni.setStorageSync('user_address', JSON.stringify(address))
        uni.navigateTo({
          url: '/mypkg/address-edit/address-edit?type=edit'
        })
      },

      async getAddressList() {
        const mobile = JSON.parse(uni.getStorageSync('userInfo')).mobile
        const {
          data: res
        } = await uni.$http.get('address_info/' + mobile + '/')
        if (res.code !== 200) return uni.$showMsg(res.msg)
        res.data.forEach(item => {
          item.address = []
          item.address.push({
            text: item.province,
            value: (item.province_id).toString()
          })
          item.address.push({
            text: item.city,
            value: (item.city_id).toString()
          })
          item.address.push({
            text: item.district,
            value: (item.district_id).toString()
          })
        })
        console.log(res);
        this.updateAddress(res.data);
        this.updateDefaultAddress(res.default_address);
      },

      // 添加地址
      addAddress() {
        uni.removeStorageSync('user_address')
        uni.navigateTo({
          url: '/mypkg/address-edit/address-edit?type=add'
        })
      },

      // 删除地址
      async deleteAddressHandler(id) {
        if (id == this.default_address_id) return uni.$showMsg('默认地址不允许删除');
        const {
          data: res
        } = await uni.$http.delete(`address/${id}/`)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        uni.$showMsg(res.msg)
        this.delAddress(id)
      },

      // 结算页面切换收货地址
      addressCheckedHandler(e) {
        console.log(this.from)
        console.log(e)
        if (this.from === 'settle') {
          uni.setStorageSync('user_checked_address', JSON.stringify(e))
          uni.navigateBack(-1)
        }
      },

    }
  }
</script>

<style lang="scss">
  .page {
    // padding-top: 30rpx;
  }

  @import '../../static/iconfont/iconfont.css';

  uni-notice-bar {
    text-align: center;
  }

  .address-item {
    background-color: #FFFFFF;
    margin: 0 30rpx 30rpx;
    padding: 24rpx 30rpx;
    border-radius: 4px;

    .receiver {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .default {
        font-size: 28rpx;
        color: #FFA424;
      }
    }

    .name {
      font-size: 30rpx;
      font-weight: bold;
      color: #000104;
    }

    .mobile {
      margin-bottom: 14rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: #000104;
    }

    .address {
      font-size: 24rpx;
      color: #C0C8D3;
    }
  }

  .slot-btns {
    display: flex;
    align-items: center;
    // margin: 0 30rpx 30rpx 0;
    margin-bottom: 30rpx;
    margin-right: 10rpx;

    >view {
      // float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 100%;
      margin-right: 20rpx;
      padding: 0 20rpx;
      width: 50px;
      height: 50px;
      color: #C0C8D3;
      background-color: #FFFFFF;
      border-radius: 25px;
      box-sizing: border-box;

      .iconfont {
        font-size: 20px;
      }
    }


  }



  .add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100rpx;
    font-size: 30rpx;
    font-weight: 500;
    color: #C0C8D3;
    margin: 0 30rpx 30rpx;
    background: #FFFFFF;
    border-radius: 4px;
  }
</style>
