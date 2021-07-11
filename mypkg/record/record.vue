<template>
  <view class="page">

    <!-- 记录表单 -->
    <uni-forms :value="recordForm" ref="form">

      <uni-forms-item label="选择日期" name="date">
        <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="dateChange">
          <view class="uni-input">{{date}}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item label="宠物体重" name="weight" v-if="pageTitle=='记录体重'">
        <uni-easyinput type="digit" pattern="number" v-model="recordForm.weight" placeholder="请输入宠物体重 (kg)"
          placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="驱虫类型" name="wormType" v-show="pageTitle==='记录驱虫'">
        <picker @change="wormTypeCange" :value="wormType" :range="wormTypeArr"
          :style="{color:recordForm.wormType==='0'?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{wormTypeArr[recordForm.wormType]}}</view>
        </picker>
      </uni-forms-item>
      <uni-forms-item label="驱虫药品" name="wormDrug" v-show="pageTitle==='记录驱虫'">
        <picker @change="wormDrugCange" :value="wormDrug" :range="wormDrugArr"
          :style="{color:recordForm.wormDrug==='0'?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{wormDrugArr[recordForm.wormDrug]}}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item label="选择疫苗" name="vaccine" v-show="pageTitle==='记录疫苗'">
        <picker @change="vaccineCange" :value="vaccine" :range="vaccineArr"
          :style="{color:recordForm.vaccine==='0'?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{vaccineArr[recordForm.vaccine]}}</view>
        </picker>
      </uni-forms-item>

    </uni-forms>

    <!-- 提交按钮-->
    <button @click="submitForm">提交</button>

    <!-- 介绍 -->
    <view class="intro-box" v-if="pageTitle==='记录驱虫'||pageTitle==='记录疫苗'">
      <view class="pic">
        <image src="/static/bg.png" mode=""></image>
      </view>

      <view class="text-box" v-for="i in 4" :key='i'>
        <view class="title">【标题标题】</view>
        <view class="desc">描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容</view>
        <view class="title">【标题标题】</view>
        <view class="desc">描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容</view>
        <view class="title">【标题标题】</view>
        <view class="desc">描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容描述内容</view>
      </view>

    </view>

  </view>
</template>

<script>
  export default {
    data() {
      const currentDate = this.getDate({
        format: true
      })
      return {
        pageTitle: '', // 页面标题
        recordForm: {
          date: '',
          weight: '',
          wormType: '0',
          wormDrug: '0',
          vaccine: '0'
        },
        date: currentDate,
        wormTypeArr: ['请选择驱虫类型', '1', '2', '3'],
        wormDrugArr: ['请选择驱虫药品', '1', '2', '3'],
        vaccineArr: ['请选择疫苗', '1', '2', '3'],
      };
    },
    computed: {
      startDate() {
        return this.getDate('start')
      },
      endDate() {
        return this.getDate(new Date())
      }
    },
    onLoad(option) {
      this.pageTitle = option.type || '记录体重'
      switch (option.type) {
        case 'weight':
          this.pageTitle = '记录体重'
          break;
        case 'bath':
          this.pageTitle = '记录洗澡'
          break;
        case 'worm':
          this.pageTitle = '记录驱虫'
          break;
        case 'vaccine':
          this.pageTitle = '记录疫苗'
          break;
      }
      uni.setNavigationBarTitle({
        title: this.pageTitle
      })

      this.recordForm.date = this.date
    },
    methods: {
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
        month = month > 9 ? month : '0' + month;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
      },
      dateChange(e) {
        this.recordForm.date = this.date = e.target.value
      },
      wormTypeCange(e) {
        this.recordForm.wormType = e.target.value
      },
      wormDrugCange(e) {
        this.recordForm.wormDrug = e.target.value
      },
      vaccineCange(e) {
        this.recordForm.vaccine = e.target.value
      },
      // 提交行为记录
      submitForm() {
        let form = {}
        form.date = this.recordForm.date

        if (this.pageTitle === '记录体重') form.weight = this.recordForm.weight
        if (this.pageTitle === '记录驱虫') {
          form.wormType = this.recordForm.wormType
          form.wormDrug = this.recordForm.wormDrug
        }
        if (this.pageTitle === '记录疫苗') form.vaccine = this.recordForm.vaccine

        console.log(form)
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
        width: 540rpx !important;
        text-align: right;
      }
    }

  }

  button {
    height: 100rpx;
    margin-top: 20rpx;
    line-height: 100rpx;
    font-size: 30rpx;
    font-weight: bold;
    // border: none;
    color: #294D7C;
    background: #FFFFFF;
    border-radius: 0;

    &::after {
      border: none;
    }
  }

  .intro-box {
    position: relative;
    margin-top: 10px;

    .pic {
      height: 100px;
      overflow: hidden;

      image {
        width: 100%;
      }
    }

    .text-box {
      position: absolute;
      top: 90px;
      width: 100%;
      // height: 300px;
      margin-top: -10px;
      padding: 20px 15px;
      background-color: #FFFFFF;
      border-radius: 10px;
      overflow: hidden;
      z-index: 999;
      box-sizing: border-box;

      .title {
        font-size: 32rpx;
        color: #333;
        margin-bottom: 10px;
        font-weight: 700;
      }

      .desc {
        font-size: 28rpx;
        color: #555;
        margin-bottom: 20px;
      }
    }

  }
</style>
