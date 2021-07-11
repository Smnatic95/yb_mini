<template>
  <view class="page">
    <uni-forms :value="addPetForm" ref="form">

      <uni-forms-item label="宠物类型" name="type">
        <radio-group @change="radioChange">
          <label class="radio" @click="radioClick(1)">
            <image v-if="!isCatChecked" src="/static/images/cat.png" mode=""></image>
            <image v-else src="/static/images/cat-active.png" mode=""></image>
            猫猫
          </label>
          <label class="radio" @click="radioClick(2)">
            <image v-if="isCatChecked" src="/static/images/dog.png" mode=""></image>
            <image v-else src="/static/images/dog-active.png" mode=""></image>
            狗狗
          </label>
        </radio-group>
      </uni-forms-item>

      <uni-forms-item label="宠物名称" name="name">
        <uni-easyinput type="text" v-model="addPetForm.name" placeholder="请输入宠物名称" placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="宠物品种" name="breed">
        <picker @change="breedCange" :value="breed" :range="breedArr"
          :style="{color:addPetForm.breed==='0'?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{breedArr[addPetForm.breed]}}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item label="宠物性别" name="sex">
        <picker @change="sexCange" :value="s" :range="sexArr" :style="{color:addPetForm.sex==='0'?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{sexArr[addPetForm.sex]}}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item label="宠物生日" name="birthday">
        <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="birthdayChange">
          <view class="uni-input">{{date}}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item label="宠物体重" name="weight">
        <uni-easyinput type="digit" pattern="number" v-model="addPetForm.weight" placeholder="请输入宠物体重 (kg)"
          placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="绝育状态" name="state">
        <picker @change="stateCange" :value="state" :range="stateArr"
          :style="{color:addPetForm.state==='0'?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{stateArr[addPetForm.state]}}</view>
        </picker>
      </uni-forms-item>

      <button @click="submitForm">提交</button>
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
      const currentDate = this.getDate({
        format: true
      })
      return {
        addPetForm: {
          type: 1,
          name: '',
          breed: '0',
          sex: '0',
          birthday: '',
          weight: "",
          state: '0'
        },
        breedArr: ['请选择宠物品种', '中国', '美国', '巴西', '日本'],
        sexArr: ['请选择宠物性别', '男', '女'],
        date: currentDate,
        stateArr: ['请选择绝育状态', '已绝育', '未绝育'],
      };
    },
    computed: {
      isCatChecked() {
        if (this.addPetForm.type === 1) return true
        return false
      },
      startDate() {
        return this.getDate('start')
      },
      endDate() {
        return this.getDate(new Date())
      }
    },
    onLoad() {
      this.addPetForm.birthday = this.date
      console.log(this.date)
    },
    methods: {
      ...mapMutations('pet', ['addPet']),

      radioClick(val) {
        this.addPetForm.type = val
      },
      breedCange(e) {
        this.addPetForm.breed = e.target.value
      },
      sexCange(e) {
        this.addPetForm.sex = e.target.value
      },
      getDate(type) {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (type === 'start') {
          year = year - 60;
        } else if (type === 'end') {
          year = year + 2;
        }
        month = month > 9 ? month : '0' + month;;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
      },
      birthdayChange(e) {
        console.log(e.target.value)
        this.addPetForm.birthday = this.date = e.target.value
      },
      stateCange(e) {
        this.addPetForm.state = e.target.value
      },
      submitForm() {
        var form = this.addPetForm
        let petList = []
        for (let key in form) {
          if (form[key] === '0' || form[key] === '') return uni.$showMsg('宠物信息输入不完整')
        }
        this.addPet(form)

        // uni.navigateTo({
        //   url: '/mypkg/pet/pet'
        // })
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
</style>
