<script>
  export default {
    onLaunch: function() {
      // onLaunch: function() {
      let _self = this;
      uni.getSystemInfo({
        success: res => {
          let modelmes = res.model;
          if (modelmes.search('iPhone X' || 'iPhone 11' || 'iPhone 12') != -1) {
            uni.setStorageSync('isIphoneX', true)
          } else {
            uni.setStorageSync('isIphoneX', false)
          }
        }
      })
      // }
      // console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
      console.log('App Launch')
    },

    onShow: function() {
      console.log('App Show')
      if (!uni.getStorageSync('token')) {
        uni.setStorageSync('token', JSON.stringify(false))
      }
    },

    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style>
  .page {
    background-color: #f6f6f6;
    min-height: 100vh;
    box-sizing: border-box;
  }

  image {
    vertical-align: middle;
  }


  @font-face {
    font-family: uniicons;
    font-weight: normal;
    font-style: normal;
    src: url('~@/static/uni.ttf') format('truetype');
  }
</style>
