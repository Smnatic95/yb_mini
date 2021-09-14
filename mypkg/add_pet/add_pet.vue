<template>
  <view class="page">
    <uni-forms :value="addPetForm" ref="form">

      <uni-forms-item label="宠物头像" name="avatar">
        <view class="avatar" @click="chosseImg" v-if="addPetForm.avatar === ''"
          style="display: flex;align-items: center;justify-content: center">
          <image src="../../static/images/pet_avatar.png" style="width:70%;height: 70%"></image>
        </view>
        <view class="avatar" v-else @click="chosseImg">
          <image :src="addPetForm.avatar"></image>
        </view>
      </uni-forms-item>

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

      <uni-forms-item label="宠物名称" name="name">
        <uni-easyinput type="text" v-model="addPetForm.name" placeholder="请输入宠物名称" placeholder-style="color:#C0C8D3" />
      </uni-forms-item>

      <uni-forms-item label="宠物品种" name="breed">
        <picker @change="breedCange" :value="addPetForm.breed" :range="breedArr" rangeKey='name'
          :style="{color:addPetForm.breed==0?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{addPetForm.breed==0?'请选择宠物品种':breedArr[addPetForm.breed]['name']}}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item label="宠物性别" name="sex">
        <picker @change="sexCange" :value="addPetForm.sex" :range="sexArr"
          :style="{color:addPetForm.sex==='0'?'#C0C8D3':'#3c3c3c'}">
          <view class="uni-input">{{sexArr[addPetForm.sex]}}</view>
        </picker>
      </uni-forms-item>

      <uni-forms-item label="宠物生日" name="birthday">
        <picker mode="date" :value="addPetForm.birthday" :start="startDate" :end="endDate" @change="birthdayChange">
          <view class="uni-input">{{addPetForm.birthday}}</view>
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

      <uni-forms-item label="是否默认" name="is_default" v-if="page_type=='edit'&&!pet_info_init_is_default">
        <label class="radio" @click="deaultChange">
          <image v-if="!addPetForm.is_default" src="/static/images/default.png" mode=""></image>
          <image v-else src="/static/images/default_active.png" mode=""></image>
        </label>
      </uni-forms-item>

      <button @click="submitForm">提交</button>
    </uni-forms>

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
      const currentDate = this.getDate({
        format: true
      })
      return {
        page_type: 'add', // 页面类型
        addPetForm: {
          type: 1, // 宠物类型
          name: '',
          avatar: '',
          breed: '0', //宠物品种列表索引
          sex: '0',
          birthday: currentDate,
          weight: "",
          state: '0',
          is_default: false
        },
        breedName: '', //选择的宠物品种
        breedArr: [], //宠物品种的列表
        sexArr: ['请选择宠物性别', '弟弟', '妹妹', '保密'],
        stateArr: ['请选择绝育状态', '已绝育', '未绝育', '保密'],
        pet_info_init_is_default: null
      };
    },
    computed: {
      isCatChecked() {
        return this.addPetForm.type == 1;
      },
      startDate() {
        return this.getDate('start')
      },
      endDate() {
        return this.getDate(new Date())
      },
      ...mapState('pet', ['petList'])
    },
    onLoad(option) {
      this.page_type = option.pet_id ? 'edit' : 'add';
      if (this.page_type === 'add') {
        uni.setNavigationBarTitle({
          title: '添加宠物'
        })
      } else {
        uni.setNavigationBarTitle({
          title: '编辑宠物'
        })
        this.pet_info_init_is_default = this.petList.find(pet => pet.pet_id == option.pet_id).is_default;
        this.addPetForm = this.petList.find(pet => pet.pet_id == option.pet_id);
        console.log('编辑宠物:', this.addPetForm);
      }
      this.getPetType();
    },
    onUnload() {
      uni.removeStorageSync('select_pet')
    },
    methods: {
      ...mapActions('pet', ['getpetlistFromOrigen']),
      //提交表单
      async submitForm() {
        var form = this.addPetForm;
        console.log('表单内容：', form)
        for (let key in form) {
          if (form[key] === 0 || form[key] === '') {
            console.log(key, form[key] === 0, form[key] === '');
            return uni.$showMsg('宠物信息输入不完整')
          }
        }
        let user_id = uni.getStorageSync('id');
        if (!user_id) {
          uni.$showMsg('请先登录');
          return
        }
        form.user_id = user_id;
        //添加
        if (this.page_type === 'add') {
          try {
            const {
              data: res
            } = await uni.$http.post('pet_create/', {
              pet_list: form
            })
            uni.$showMsg('添加成功');
            this.successCallback();
          } catch (err) {
            uni.$showMsg('添加失败' + err);
          }
        }
        //编辑
        else {
          try {
            const {
              data: res
            } = await uni.$http.put(`pet_edit/${form.pet_id}/`, {
              pet_list: form
            })
            uni.$showMsg('修改成功');
            this.successCallback();
          } catch (err) {
            uni.$showMsg('编辑失败' + err);
          }
        }
      },
      chosseImg() {
        uni.chooseImage({
          count: 1, //限制图片上传的数量,做多9张
          success: res => { //上传成功的回调
            let imgSrc = res.tempFilePaths[0]
            let tempFileSize = res.tempFiles[0].size;
            console.log('图片大小', tempFileSize);
            console.log('图片临时地址', imgSrc)
            if (tempFileSize <= 20000000) {
              //跳转到裁剪页面
              uni.navigateTo({
                url: '../crop-pic/crop-pic?imgSrc=' + imgSrc
              })
            } else {
              uni.showToast({
                title: '上传图片不能大于20M!',
                icon: 'none'
              })
            }

          }
        })
      },
      // 默认改变
      deaultChange() {
        this.addPetForm.is_default = !this.addPetForm.is_default
      },
      onCropedImg(imgsrc){
        this.addPetForm.avatar = imgsrc;
      },
      //提交成功回调
      successCallback() {
        setTimeout(() => {
          this.getpetlistFromOrigen();
          uni.navigateBack(-1);
        }, 1500);
      },
      //获取宠物类型
      async getPetType() {
        let petList = []
        let keyword = this.addPetForm.type
        const {
          data: res
        } = await uni.$http.get('pet_breed/' + keyword + '/')
        petList = res.lists;
        let filterIndex;
        let mbId = keyword === 1 ? 21 : 48
        for (let i = 0; i < petList.length; i++) {
          if (petList[i]['id'] === mbId) filterIndex = i;
        }
        let other = petList.splice(filterIndex, 1)
        petList.splice(filterIndex, 1)
        petList.push(...other)

        petList.unshift({
          name: '请选择宠物品种'
        })
        this.breedArr = petList;
      },
      radioClick(val) {
        this.addPetForm.type = val
        this.breedArr = [];
        this.addPetForm.breed = '0'
        this.getPetType();
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
        this.addPetForm.birthday = e.target.value
      },
      stateCange(e) {
        this.addPetForm.state = e.target.value
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
