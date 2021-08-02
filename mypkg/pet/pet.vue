<template>
  <view class="page">
    <!-- 添加宠物按钮 -->
    <view class="add-pet" @click="gotoAddPet" v-if="JSON.stringify(petList)==='[]'">
      <view>
        <uni-icons type="plusempty" size="26" color=""></uni-icons>
        <text>新增宠物</text>
      </view>
    </view>

    <view class="pet-box" v-else>
      <!-- 宠物信息 -->
      <view class="top">
        <view class="info" @click="gotoAddPet('edit')">
          <view class="avatar">
            <image :src="select_pet.avatar"></image>
          </view>
          <view class="text">
            <view class="name">{{select_pet.name}}
              <image src="/static/images/male.png"></image>
            </view>
            <view class="time">3年6个月</view>
          </view>
        </view>
        <view class="change" @click="showChangePet">
          <image src="/static/images/change.png"></image><text>切换宠物</text>
        </view>
      </view>

      <!-- 行为记录 -->
      <view class="record">
        <view class="title">— 健康档案 —</view>

        <!-- 记录项 -->
        <view class="date-item">
          <view class="left">
            <view class="day"></view>
            <view class="month">今天</view>
          </view>
          <view class="right">
            <view class="ago">3年6个月</view>
            <!-- 添加记录按钮 -->
            <view class="add-btn" @click="showRecord">
              <uni-icons type="plusempty" size="50" color="#c0c8d3"></uni-icons>
            </view>

            <!-- 记录项-->
            <view class="record-item">
              <!-- 体重 -->
              <block>
                <image src="/static/images/re-worm.png"></image>
                <view>
                  <view class="record-info">xxx内驱虫</view>
                  <view class="intro">预计下次驱虫在2020年7月20日</view>
                </view>
              </block>
            </view>
            <view class="record-item">
              <!-- 洗澡 -->
              <block>
                <image src="/static/images/re-vaccine.png"></image>
                <view>
                  <view class="record-info">xxx疫苗第 1 针</view>
                  <view class="intro">预计下次打疫苗在2020年10月12日</view>
                </view>
              </block>
            </view>

          </view>
        </view>

        <!-- 记录 -->
        <view class="date-item">
          <view class="left">
            <view class="day">29</view>
            <view class="month">6月</view>
          </view>
          <view class="right">
            <view class="ago">3年6个月</view>

            <!-- 记录项-->
            <view class="record-item">
              <!-- 体重 -->
              <block>
                <image src="/static/images/re-weight.png"></image>
                <view>
                  <view class="record-info">10.25kg</view>
                  <view class="intro">距上次记录增加了0.2kg</view>
                </view>
              </block>
            </view>
            <view class="record-item">
              <!-- 洗澡 -->
              <block>
                <image src="/static/images/re-bath.png"></image>
                <view>
                  <view class="record-info">我们洗澡澡咯！~</view>
                  <view class="intro">猫咪洗澡不用太频繁哟</view>
                </view>
              </block>
            </view>
          </view>
        </view>


      </view>
    </view>

    <!-- 切换宠物 -->
    <uni-drawer ref="showChangePet" mode="top" :mask-click="true">
      <view>
        <scroll-view class="pet-drawer" scroll-x="true" scroll-left="0">
          <view class="pet-item" v-for="(item,i) in petList" :key="i" @click="changePet(item)">
            <view class="box">
              <view class="avatar">
                <image :src="item.avatar"></image>
              </view>
              <view class="name">{{item.name}}</view>
            </view>
          </view>

          <view class="pet-item" @click="gotoAddPet('add')">
            <view class="box">
              <view class="avatar">
                <image src="/static/images/add-icon.png"></image>
              </view>
              <view class="name">增加宠物</view>
            </view>
          </view>
        </scroll-view>
      </view>
    </uni-drawer>

    <!-- 行为记录-->
    <uni-drawer class="record-drawer" ref="showRecord" mode="bottom" :mask-click="true">
      <view class="record-icons">
        <!-- <scroll-view class="record-icon" scroll-x="true" scroll-left="0"> -->
        <!-- <view class="icon-item" @click="gotoRecord('weight')">
          <image src="/static/images/re-weight.png" mode=""></image>
          <text>记录体重</text>
        </view> -->
        <!-- <view class="icon-item" @click="gotoRecord('bath')">
          <image src="/static/images/re-bath.png" mode=""></image>
          <text>记录洗澡</text>
        </view> -->
        <view class="icon-item" @click="gotoRecord('worm')">
          <image src="/static/images/re-worm.png" mode=""></image>
          <text>记录驱虫</text>
        </view>
        <view class="icon-item" @click="gotoRecord('vaccine')">
          <image src="/static/images/re-vaccine.png" mode=""></image>
          <text>记录疫苗</text>
        </view>
        <!-- </scroll-view> -->
      </view>
      <view>

      </view>
    </uni-drawer>


  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {
        // select_pet:{}
        pet: {}
      };
    },
    computed: {
      ...mapState('pet', ['petList']),

      select_pet() {
        if (!this.pet.name) return this.petList[0]
        return this.pet
      }
    },
    onLoad() {},
    methods: {
      gotoAddPet(type) {
        if (type === 'edit') uni.setStorageSync('select_pet', JSON.stringify(this.select_pet))
        uni.navigateTo({
          url: '/mypkg/add_pet/add_pet?type=' + type
        })
      },
      showChangePet() {
        this.$refs.showChangePet.open();
      },
      changePet(item) {
        console.log(item)
        this.pet = item
        this.$refs.showChangePet.close();
      },
      showRecord() {
        this.$refs.showRecord.open();
      },
      gotoRecord(type) {
        uni.navigateTo({
          url: '/mypkg/record/record?type=' + type
        })
      },
      // 编辑宠物信息
      gotoEditPet() {

      },
    }
  }
</script>

<style lang="scss">
  .add-pet {
    padding-top: 30rpx;

    >view {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 120rpx;
      margin: 0 30rpx;
      font-size: 30rpx;
      font-weight: 500;
      color: #294D7C;
      background-color: #fff;
      border-radius: 8rpx;
    }
  }

  .pet-box {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // height: 142rpx;
      padding: 30rpx;
      padding-right: 0;
      background: #FFFFFF;
      box-sizing: border-box;

      .info {
        display: flex;
        align-items: center;

        .avatar {
          width: 90rpx;
          height: 90rpx;
          margin-right: 22rpx;
          border-radius: 50%;
          overflow: hidden;

          image {
            width: 100%;
            height: 100%;

          }
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .name {
            font-size: 32rpx;
            font-weight: bold;
            color: #000104;

            image {
              width: 28rpx;
              height: 28rpx;
              margin-left: 8rpx;
            }
          }

          .time {
            font-size: 24rpx;
            font-weight: 500;
            color: #8F99A7;
          }
        }
      }

      .change {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180rpx;
        height: 68rpx;
        background: #FEE7D6;
        font-size: 12px;
        font-weight: bold;
        color: #FFA424;
        border-radius: 20px 0px 0px 20px;

        image {
          width: 35rpx;
          height: 35rpx;
          margin: 5rpx;
        }
      }
    }

    .record {
      height: 100%;
      margin-top: 20rpx;
      background-color: #FFFFFF;

      .title {
        padding: 30rpx 0 34rpx;
        text-align: center;
        font-size: 24rpx;
        font-weight: 500;
        color: #8F99A7;
      }

      .date-item {
        display: flex;
        padding-bottom: 48rpx;

        .left {
          width: 120rpx;
          margin-right: 30rpx;
          text-align: right;
          font-weight: bold;
          color: #F3C17B;

          .day {
            font-size: 48rpx;
          }

          .month {
            font-size: 36rpx;
          }
        }

        .right {
          margin-top: 10rpx;

          .ago {
            font-size: 24rpx;
            font-weight: 500;
            color: #8F99A7;
          }

          .add-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 75px;
            height: 75px;
            margin-top: 30rpx;
            background: #F6F6F6;
            border-radius: 8rpx;
          }

          .record-item {
            display: flex;
            align-items: center;
            width: 540rpx;
            // width: 100%;
            height: 134rpx;
            padding: 30rpx;
            margin-top: 30rpx;
            box-sizing: border-box;
            background: #F6F6F6;
            border-radius: 4px;

            image {
              width: 76rpx;
              height: 76rpx;
              margin-right: 20rpx;
            }

            >view {
              .record-info {
                font-size: 36rpx;
                font-weight: 500;
                color: #000104;
              }

              .intro {
                font-size: 24rpx;
                font-weight: 500;
                color: #000104;
              }
            }
          }
        }
      }
    }

  }

  .pet-drawer {
    white-space: nowrap;
    width: 100%;
    // padding: 50rpx 0;
    padding-top: 50rpx;
  }

  .pet-item {
    display: inline-block;
    width: 140rpx;
    // margin-top: -45rpx;

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

  .record-drawer .uni-drawer__content--visible.data-v-558f1882 {
    // border-radius: 30% 30% 0 0;
    background: url('/static/images/re-bg.png') no-repeat !important;
    background-size: 100% !important;
  }

  .record-icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 120rpx 0;
    font-size: 28rpx;
    font-weight: 500;
    color: #000104;

    .icon-item {
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;

      image {
        width: 94rpx;
        height: 94rpx;
        margin-bottom: 8rpx;
      }
    }

  }
</style>
