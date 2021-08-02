<template>
  <view class="page">
    <uni-forms :value="countForm" ref="form" label-width='80'>

      <uni-forms-item label="宠物类型" name="type">
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

      <uni-forms-item label="宠物年龄" name="age">
        <picker @change="ageCange" :value="age" :range="ageArr"
          :style="{color:countForm.age==='0'?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{ageArr[countForm.age]}}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item label="宠物体重" name="weight">
        <uni-easyinput type="digit" pattern="number" v-model="countForm.weight" placeholder="请输入宠物体重 (kg)"
          placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="蛋白质" name="protein">
        <uni-easyinput type="digit" pattern="number" v-model="countForm.protein" placeholder="请输入蛋白质含量 (%)"
          placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="脂肪" name="fat">
        <uni-easyinput type="digit" pattern="number" v-model="countForm.fat" placeholder="请输入脂肪含量 (%)"
          placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="碳水(淀粉)" name="starch">
        <uni-easyinput type="digit" pattern="number" v-model="countForm.starch" placeholder="请输入碳水含量 (%)"
          placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <button @click="submitForm">生成报告</button>
    </uni-forms>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        ageArr: ['请选择宠物年龄', '10个月以上', '8-10个月', '6-8个月', '4-6个月', '小于4个月', ],
        countForm: {
          type: 1, // 宠物类型
          age: '0',
          weight: "",
          protein: '',
          fat: '',
          starch: '',
        },
      };
    },
    computed: {
      isCatChecked() {
        if (this.countForm.type === 1) return true
        return false
      },
    },
    methods: {
      radioClick(val) {
        this.countForm.type = val
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
