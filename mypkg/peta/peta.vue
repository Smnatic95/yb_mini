<template>
  <view class="page">

    <uni-notice-bar single="true" text="左滑可编辑宠物"></uni-notice-bar>

    <uni-swipe-action>
      <!--宠物列表-->
      <uni-swipe-action-item v-for="(item,i) in petList" :key='i'>
        <view class="item_pet">
          <view class="pull_left avatar">
            <image :src="item.avatar" mode="scaleToFill"></image>
          </view>
          <!--宠物信息-->
          <view class="pull_center info_pet">
            <view class="name">
              {{item.name}}
            </view>
            <view class="sex">
              性别: {{item.sex==1?'弟弟': item.sex==2?'妹妹':'保密' }}
            </view>
            <view class="weight">
              重量: {{item.weight}}kg
            </view>
          </view>
          <view class="default" v-if="item.is_default">
            默认
          </view>
        </view>
        <template v-slot:right>
          <!--编辑-->
          <view class="slot-btns">
            <view class="edit" @click="editPet(item.pet_id)">
              <view class="iconfont icon-xiugai"></view>
            </view>
            <!--删除-->
            <view class="remove" @click="deletePetHandler(item)">
              <uni-icons type="trash" size="20" color=""></uni-icons>
            </view>
          </view>
        </template>
      </uni-swipe-action-item>
    </uni-swipe-action>
    <view class="add-btn" @click="addPet">
      <uni-icons type="plusempty" size="22" color="" />
      新增宠物
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'

  export default {
    data() {
      return {
        type: 0,
        from: null,
      };
    },

    onLoad(option) {
      this.getpetlistFromOrigen();
    },

    computed: {
      ...mapState('pet', ['petList']),
    },

    methods: {
      ...mapActions('pet', ['deletePetfromOrigen', 'getpetlistFromOrigen']),
      // 跳转修改宠物
      editPet(pet_id) {
        console.log(pet_id);
        uni.navigateTo({
          url: `/mypkg/add_pet/add_pet?type=edit&pet_id=${pet_id}`
        })
      },
      // 添加宠物
      addPet() {
        uni.removeStorageSync('user_Pet')
        uni.navigateTo({
          url: '/mypkg/add_pet/add_pet?type=add'
        })
      },
      // 删除宠物
      async deletePetHandler(pet) {
        if (pet.is_default) {
          uni.$showMsg('默认宠物不可删除')
        } else {
          try {
            const {
              data: res
            } = await uni.$http.delete(`pet_edit/${pet.pet_id}/`);
            uni.$showMsg(res.msg);
            setTimeout(() => {
              this.getpetlistFromOrigen();
            }, 1500);
          } catch (err) {
            uni.$showMsg('删除失败' + err);
          }
        }
      }
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

  .item_pet {
    background-color: #FFFFFF;
    margin: 0 30rpx 30rpx;
    padding: 24rpx 30rpx;
    border-radius: 4px;
    display: flex;

    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      overflow: hidden;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .info_pet {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      margin-left: 30rpx;

      >.name {
        font-size: 35rpx;
        font-weight: bold;
        color: #000104;
      }

      .sex,.weight{
        color:gray;
        font-size: 27rpx;
      }
      
    }

    .default {
      position: absolute;
      top: 20rpx;
      right: 50rpx;
      color: #FFA424;
      font-size: 29rpx;
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
