<template>
  <view class="box-crop-pic">
    <image-cropper ref="imagecropper" @tapcut="mycut" @load="cropperload" :imgSrc="imgSrc" :limit_move='true'
      :disable_width="100" :disable_height="100" :export_scale="1" :quality="1" img_width="100%" :disable_rotate="true">
    </image-cropper>
    <view class="bottom_actions">
      <view class="btn_done" @click="handledoneclick">
        完成
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        imgSrc: null
      }
    },
    onLoad(options) {
      this.imgSrc = options.imgSrc ? options.imgSrc :
        'https://img.souutu.com/2021/0902/20210902014611190.jpg.260.343.jpg'
    },
    methods: {
      cropperload(e) {
        console.log('cropper加载完毕');
      },
      mycut(e) {
        console.log(e.detail.url);
        uni.previewImage({
          urls: [e.detail.url],
          current: e.detail.url,
          fail(err) {
            console.log(err)
          }
        })
      },
      handledoneclick() {
        this.$refs.imagecropper.getImg((obj) => {
          uni.uploadFile({
            url: uni.$baseUrl + 'pet_image/',
            filePath: obj.url,
            fileType: 'image',
            name: 'data',
            success: (res) => {
              console.log('上传成功===uploadImage success, res is:', res.data)
              let requesData = JSON.parse(res.data);         
              var pages = getCurrentPages(); //当前页
              var beforePage = pages[pages.length - 2]; //上个页面
              beforePage.$vm.addPetForm.avatar = requesData.image;
              uni.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000
              })            
              setTimeout(() => {
                uni.navigateBack();
              },1000)
            },
            fail: (err) => {   
              console.log('上传失败uploadImage fail', err);
              uni.showModal({
                content: err.errMsg,
                showCancel: false
              });
              
            }
          })


        })
      }
    }
  }
</script>

<style lang="scss">
  .box-crop-pic {

    .bottom_actions {
      width: 100vw;
      height: 100rpx;
      position: fixed;
      bottom: 0;
      left: 0;
      color: #fff;
      background-color: #000;
      z-index: 99999;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      box-sizing: border-box;
      padding: 0 25rpx;


      .btn_done {
        height: 60rpx;
        line-height: 60rpx;
        background-color: #294D7C;
        padding: 0 35rpx;
        font-size: 32rpx;
        border-radius: 30rpx;
      }

    }
  }
</style>
