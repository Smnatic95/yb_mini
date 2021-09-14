<template>
  <view class="page">
    <form bindsubmit="release">
      <view class="container">

        <view class="header">
          <view class="cancel">
            取消
          </view>
          <button class="release" form-type="submit">发布</button>
        </view>

        <view class="main_cnt">
          <!--商品信息-->
          <view class="g_info">
            <view class="thumb">
              <image mode="widthFix" src="https://7n.oripetlife.com/yb-mini-hjml1.png">
              </image>
            </view>
            <view class="pull_right">
              <view class="name">
                【猫】大宠爱体内外驱虫药*3支(2.6-7.5KG【猫】大宠爱体内外驱虫药*3支(2.6-7.5KG
              </view>
              <!--   <view class="specifications">
                规格:270ml*15入整箱装 内存:256GB+8GB
              </view> -->
            </view>
          </view>

          <!--描述相符-->
          <view class="box_score desc">
            <view class="toa">
              描述相符
            </view>
            <!--评分-->
            <view class="score_box">
              <view class="star" v-for="(item,index) in starArray" :key="index" @click="starClick(index)">
                <text class="iconfont icon-xingxing2" v-if="index < desc_score"></text>
                <text class="iconfont icon-xingxing" v-else></text>
              </view>
            </view>
          </view>

          <textarea name="Introduction" placeholder-class="placeholder" id="Introduction" cols="30" rows="6"
            placeholder="从多个角度评价宝贝,可以帮助更多想买的人"></textarea>

          <view class="upload_imgs">
            <view class="upload_img_box" v-for="(item,index) in imgFilePaths" :key="index">
              <view class="btn_delete" @click="imgDelete(index)">
                X
              </view>
              <view class="imgWraper">
                <image @click="previewUpImgs(index)" mode="widthFix" :src="item"></image>
              </view>
            </view>
            <view class="chooseImg" @click="chooseImg">
              <view class="carmeraIcon">
                <image src="../../static/images/icon/camera.png" mode="scaleToFill"></image>
              </view>
              <view class="toa">
                拍买家秀
              </view>
            </view>
          </view>

        </view>

      </view>
    </form>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        imgFilePaths: [],
        starArray: new Array(5),
        desc_score: 1
      }
    },
    methods: {
      chooseImg(e) {
        wx.showActionSheet({
          itemList: ['拍摄', '从相册中选择'],
          success: res => {
            if (res.tapIndex === 0) {
              uni.chooseImage({
                count: 1,
                sourceType: ['camera'],
                success: res => {
                  let tempFileSize = res.tempFiles[0].size;
                  if (tempFileSize <= 20000000) {
                    uni.navigateTo({
                      url: '/mypkg/crop-pic/crop-pic?imgSrc=' + res.tempFilePaths[0] + '&dad=evaluate'
                    })
                  } else {
                    uni.showToast({
                      title: '上传图片不能大于20M!',
                      icon: 'none'
                    })
                  }
                }
              })
            } else {
              uni.chooseImage({
                count: 5,
                sourceType: ['album'],
                success: res => {
                  let upimgsQueue = res.tempFilePaths.map(item => this.myUploadImg(item));
                  uni.showLoading({
                    title: '图片上传中'
                  });
                  Promise.all(upimgsQueue).then((res) => {
                    uni.hideLoading();
                    this.imgFilePaths.push(...res);
                  }).catch(err => {
                    uni.hideLoading();
                    console.log(err);
                  })
                }
              })
            }
          }
        })
      },
      previewUpImgs(curIndex) {
        let _this = this;
        uni.previewImage({
          urls: _this.imgFilePaths,
          current: _this.imgFilePaths[curIndex]
        })
      },
      starClick(index) {
        this.desc_score = index + 1;
      },
      imgDelete(index) {
        this.imgFilePaths.splice(index, 1);
      },
      onCropedImg(imgsrc) {
        this.imgFilePaths.push(imgsrc);
      },
      myUploadImg(imgsrc) {
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: uni.$baseUrl + 'pet_image/',
            filePath: imgsrc,
            fileType: 'image',
            name: 'data',
            success: (res) => {
              let requesData = JSON.parse(res.data);
              resolve(requesData.image);
            },
            fail: (err) => {
              reject(err);
            }
          })
        })

      }
    }
  }
</script>

<style lang="scss">
  .page {
    width: 100vw;
    min-height: 100vh;
    background-color: #F1F1F1;

    .container {
      width: 95vw;
      margin: 0 auto;
      padding-top: 10rpx;


      .header {
        width: 100%;
        padding-top: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .cancel {
          font-size: 30rpx;
        }

        .release {
          border: none;
          width: auto;
          font-size: 30rpx;
          background-color: #FA4906;
          font-weight: normal;
          color: #fff;
          letter-spacing: 4rpx;
          border-radius: 30rpx;
          padding: 0 30rpx;
          margin: 0;
          height: 60rpx;
          line-height: 60rpx;

          &::after {
            border: none;
          }
        }

      }


      .main_cnt {
        width: 90vw;
        margin: 0 auto;
        box-sizing: border-box;
        margin-top: 20rpx;
        background-color: #fff;
        padding: 10rpx 25rpx 30rpx 25rpx;
        border-radius: 30rpx;


        .g_info {
          display: flex;
          font-size: 28rpx;

          .thumb {
            width: 20%;
            min-height: 80rpx;

            image {
              width: 100%;
              border-radius: 15rpx;
            }
          }

          .pull_right {
            width: 80%;
            box-sizing: border-box;
            padding-left: 10rpx;
            padding-top: 20rpx;
            display: flex;

            .name {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #444;
            }

            .specifications {
              font-size: 22rpx;
              margin-top: 15rpx;
              color: #555;
            }
          }
        }

        .upload_imgs {
          display: flex;
          flex-wrap: wrap;

          >view {
            width: 195rpx;
            height: 195rpx;
            margin-right: 20rpx;
            margin-top: 15rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          >view:nth-of-type(3n+3) {
            margin: 0;
          }

          .chooseImg {
            background-color: #F1F1F1;
            border-radius: 30rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px dashed #ccc;

            .carmeraIcon {
              width: 50rpx;
              height: 50rpx;

              image {
                width: 100%;
                height: 100%;
              }
            }

            .toa {
              margin-top: 10rpx;
              font-size: 26rpx;
            }
          }


          .upload_img_box {
            position: relative;

            .btn_delete {
              position: absolute;
              top: -10rpx;
              right: -10rpx;
              background-color: rgba(0, 0, 0, 0.6);
              color: #fff;
              z-index: 999;
              font-size: 23rpx;
              font-weight: 600;
              height: 40rpx;
              line-height: 40rpx;
              width: 40rpx;
              text-align: center;
              border-radius: 50%;
            }

            .imgWraper {
              width: 100%;
              height: 100%;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;

              image {
                width: 100%;
              }
            }
          }

        }

        #Introduction {
          margin-top: 20rpx;
          width: 100%;
          max-height: 250rpx;
        }

        .placeholder {
          font-size: 27rpx;
          position: relative;
        }

      }
    }
  }

  .box_score {
    display: flex;
    align-items: center;
  }

  .box_score.desc {
    padding: 20rpx 0;
  }

  .box_score.desc .toa {
    font-size: 28rpx;
    font-weight: 600;
  }

  .score_box {
    margin-left: 30rpx;
    display: flex;
    align-items: center;
  }

  .score_box .iconfont {
    font-size: 42rpx;
    margin: 0 10rpx;
  }

  .score_box .icon-xingxing2 {
    color: #FA4906;
  }
</style>
