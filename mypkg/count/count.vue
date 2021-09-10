<template>
  <view class="page">
    <uni-forms :value="countForm" ref="form" label-width='80'>

      <view class="tabs">
        <view class="tab" :class="{active:countForm.counter_type==1}" @click="tabClick(1)">
          简单版
        </view>
        <view class="tab" :class="{active:countForm.counter_type==2}" @click="tabClick(2)">
          复杂版
        </view>
      </view>

      <view class="btns_import">
        <view class="box_btn" @click="importpetData">
          <image class="icon-import" src="../../static/images/icon_import.png" mode="scaleToFill"></image>
          <view class="btn_import">导入宠物数据</view>
        </view>
        <view class="box_btn bread" v-if="countForm.counter_type==2" @click="importBreadData">
          <image class="icon-import" src="../../static/images/icon_import.png" mode="scaleToFill"></image>
          <view class="btn_import">导入猫粮数据</view>
        </view>
      </view>

      <uni-forms-item label="宠物类型" name="pet_type">
        <radio-group @change="radioChange">
          <label class="radio" @click="radioClick(1)">
            <image v-if="!isCatChecked" src="/static/images/cat.png"></image>
            <image v-else src="/static/images/cat-active.png"></image>
            猫猫
          </label>
          <label class="radio" @click="radioClick(2)">
            <image v-if="isCatChecked" src="/static/images/dog.png"></image>
            <image v-else src="/static/images/dog-active.png"></image>
            狗狗
          </label>
        </radio-group>
      </uni-forms-item>

      <uni-forms-item label="宠物年龄" name="pet_age">
        <picker @change="ageCange" :value="countForm.pet_age" :range="ageArr"
          :style="{color:countForm.pet_age=='0'?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{ageArr[countForm.pet_age]}}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item label="宠物体重" name="pet_weight">
        <uni-easyinput type="digit" pattern="number" v-model.number="countForm.pet_weight" placeholder="请输入宠物体重 (kg)"
          placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <view class="form-complicated" v-if="countForm.counter_type==2">
        <uni-forms-item label="蛋白质" name="protein">
          <uni-easyinput type="digit" pattern="number" v-model.number="countForm.protein" placeholder="请输入蛋白质含量 (%)"
            placeholder-style="color:#C0C8D3" />
        </uni-forms-item>

        <uni-forms-item label="脂肪" name="fat">
          <uni-easyinput type="digit" pattern="number" v-model.number="countForm.fat" placeholder="请输入脂肪含量 (%)"
            placeholder-style="color:#C0C8D3" />
        </uni-forms-item>

        <uni-forms-item label="碳水(淀粉)" name="carbonwater">
          <uni-easyinput type="digit" pattern="number" v-model.number="countForm.carbonwater" placeholder="请输入碳水含量 (%)"
            placeholder-style="color:#C0C8D3" />
        </uni-forms-item>

      </view>

      <template v-if="userInfo.mobile">
        <button @click="submitForm">生成报告</button>
      </template>

      <template v-else>
        <button class="btn_submit" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">生成报告</button>
      </template>

    </uni-forms>

    <!-- 宠物列表 -->
    <uni-drawer ref="PetList" mode="top" :mask-click="true">
      <scroll-view class="pet-drawer" scroll-x="true" scroll-left="0">
        <view class="pet-item" v-for="(item,i) in petList" :key="i" @click="choosePet(item)">
          <view class="box">
            <view class="avatar">
              <image :src="item.avatar"></image>
            </view>
            <view class="name">{{item.name}}</view>
          </view>
        </view>

        <view class="pet-item" @click="gotoAddPet()">
          <view class="box">
            <view class="avatar">
              <image src="/static/images/add-icon.png"></image>
            </view>
            <view class="name">增加宠物</view>
          </view>
        </view>
      </scroll-view>
    </uni-drawer>

    <!-- 猫粮产品列表 -->
    <uni-drawer ref="breadList" mode="top" :mask-click="true">
      <scroll-view class="bread-drawer" scroll-x="true" scroll-left="0">

        <view class="bread-item" v-for="(item,i) in breadlist" :key="i" @click="chooseBread(item)">
            <view class="name">{{item.name}}</view>
        </view>

      </scroll-view>
    </uni-drawer>

  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import phoneMix from '@/mixins/get-phone.js'
  export default {
    mixins: [phoneMix], // 导入公共js
    data() {
      return {
        countForm: {
          counter_type: 1,
          pet_type: 1, // 宠物类型
          pet_age: 0,
          pet_weight: "",
          protein: null,
          fat: null,
          carbonwater: null
        },
        breadlist: [{
          id: 1,
          name: '黑金猫粮',
          protein: '42.02',
          fat: '20.20',
          carbonwater: '26.00'
        }, {
          id: 2,
          name: '幼猫粮',
          protein: '41.40',
          fat: '21.20',
          carbonwater: '26.00'
        }, {
          id: 3,
          name: '成猫粮',
          protein: '41.40',
          fat: '21.20',
          carbonwater: '26.00'
        }]
      };
    },
    computed: {
      isCatChecked() {
        return this.countForm.pet_type == 1
      },
      ...mapState('pet', ['petList']),
      ...mapState('user', ['userInfo']),
      ageArr() {
        if (this.countForm.pet_type == 1) {
          return ['请选择宠物年龄', '小于4个月', '4-6个月', '6-8个月', '8-10个月', '10个月以上']
        } else {
          return ['请选择宠物年龄', '小于4个月', '4-6个月', '6-10个月', '10个月以上']
        }
      }
    },
    onLoad(options) {
      const parentId = uni.getStorageSync('parent_id');
      console.log('页面参数的parent_id:', options.parent_id, '本地parent_id:', parentId);
      uni.setStorageSync('parent_id', parentId ? parentId : options.parent_id);
    },
    methods: {
      chooseBread(item){
        console.log(item);
        this.countForm.protein = item.protein;
        this.countForm.fat = item.fat;
        this.countForm.carbonwater = item.carbonwater;
        this.$refs.breadList.close();
      },
      radioClick(val) {
        this.countForm.pet_age = 0;
        this.countForm.pet_type = val
      },
      tabClick(val) {
        this.countForm.counter_type = val;
      },
      importpetData() {
        this.$refs.PetList.open();
      },
      importBreadData() {
        this.$refs.breadList.open();
      },
      choosePet(pet) {
        this.$refs.PetList.close();
        let pet_age = ((new Date().getTime() - new Date(pet.birthday).getTime()) / 1000 / 60 / 60 / 24 / 30).toFixed(2);
        console.log(pet_age);
        if (pet.type == 1) {
          if (pet_age < 4) {
            pet_age = 1;
          } else if (pet_age > 4 && pet_age <= 6) {
            pet_age = 2;
          } else if (pet_age > 6 && pet_age <= 8) {
            pet_age = 3;
          } else if (pet_age > 8 && pet_age <= 10) {
            pet_age = 4;
          } else if (pet_age > 10) {
            pet_age = 5;
          }
        } else {
          if (pet_age < 4) {
            pet_age = 1;
          } else if (pet_age > 4 && pet_age <= 6) {
            pet_age = 2;
          } else if (pet_age > 6 && pet_age <= 10) {
            pet_age = 3;
          } else if (pet_age > 10) {
            pet_age = 4;
          }
        }
        console.log(pet_age);
        this.countForm.pet_age = pet_age;
        this.countForm.pet_weight = pet.weight;
        this.countForm.pet_type = pet.type;
      },
      ageCange(e) {
        this.countForm.pet_age = e.detail.value;
      },
      async submitForm() {
        try {
          let form = {};
          for (var key in this.countForm) {
            form[key] = this.countForm[key]
          }
          //简单版
          if (form.counter_type == 1) {
            let complicatedKey = ['protein', 'fat', 'carbonwater'];
            complicatedKey.forEach((key) => {
              delete form[key]
            })
          }
          //是数字的字符串转化为数字
          for (var key in form) {
            if (!form[key]) {
             return uni.$showMsg('信息不完整');
            }
            if (!isNaN(Number(form[key]))) {
              form[key] = Number(form[key]);
            }else{
              return uni.$showMsg('请输入数字');
            }
          }

          const {
            data: res
          } = await uni.$http.post('pet_counter/', {
            pet_list: form
          })
          console.log(res);
          if (res.code == 200) {
            uni.navigateTo({
              url: `../count-success/count-success?countForm=${JSON.stringify(form)}&res=${JSON.stringify(res)}`
            })
          } else {
            throw new Error("请求出错");
          }
        } catch (err) {
          console.log(err);
        }
      },
      gotoAddPet() {
        uni.navigateTo({
          url: "../add_pet/add_pet"
        })
      }
    }
  }
</script>

<style lang="scss">
  .page {
    padding-top: 20rpx;
  }
  
  .bread-drawer{
    width: 100vw;
    box-sizing: border-box;
    padding: 30rpx 20rpx;
    
    .bread-item{
      display: inline-block;
      margin-left: 20rpx;
      height: 70rpx;
      line-height: 70rpx;
      padding: 0 20rpx;
      background-color: #2A4E7C;
      color: #fff;
      border-radius: 15rpx;
      font-size: 28rpx;
      
      &:first-of-type{
        margin-left: 0;
      }
    }
  }

  .btns_import {
    background-color: #fff;
    display: flex;
    margin-bottom: 10rpx;
    padding: 20rpx;
    justify-content: center;

    .box_btn {
      display: flex;
      margin-left: 20rpx;
      border-left: 1px solid #ccc;
      padding-left: 20rpx;

      &:first-of-type {
        margin-left: 0;
        border: none;
        padding-left: 0;
      }

      .icon-import {
        width: 70rpx;
        height: 70rpx;
      }

      .btn_import {
        line-height: 70rpx;
        height: 70rpx;
        margin: 0;
        padding: 0;
        color: #FFAE84;
      }
    }

  }

  .pet-drawer {
    white-space: nowrap;
    width: 100%;
    padding-top: 50rpx;

    .pet-item {
      display: inline-block;
      width: 140rpx;

      .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      &:first-child {
        margin-left: 30rpx;
      }

      &:last-child {
        margin-bottom: 45rpx;
        margin-right: 30rpx;
      }

      .avatar {
        margin-top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90rpx;
        height: 90rpx;
        margin-bottom: 16rpx;
        background-color: #F6F6F6;
        border-radius: 50%;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        font-size: 28rpx;
        font-weight: 500;
        color: #000104;
      }
    }

  }


  .tabs {
    display: flex;
    justify-content: center;
    height: 80rpx;

    .tab {
      margin-left: 40rpx;
      line-height: 80rpx;
      color: rgb(95, 89, 92);
      font-size: 30rpx;
      transition: font-size .06s linear;

      &:first-of-type {
        margin-left: 0;
      }

      &.active {
        color: #000;
        font-size: 34rpx;
        font-weight: bold;
      }

    }

  }

  .uni-forms-item {
    background-color: #FFFFFF;
    border-bottom: 1px solid #F6F6F6;

    .uni-forms-item__inner {
      // padding-bottom: 0 !important;
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
        width: 500rpx !important;
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

  radio-group {
    display: flex;
    justify-content: flex-end;
  }

  .radio {
    display: flex;
    align-items: center;

    image {
      width: 60rpx;
      height: 60rpx;
      margin-left: 30rpx;
      margin-right: 10rpx;
    }
  }

  .avatar {
    float: right;
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
</style>
