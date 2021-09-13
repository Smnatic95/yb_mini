<script>
  import {
    mapMutations,
    createNamespacedHelpers
  } from 'vuex'
  const {
    mapMutations: mapMutationsCart
  } = createNamespacedHelpers("cart")
  const {
    mapMutations: mapMutationsAddress
  } = createNamespacedHelpers("address")

  export default {
    globalData: {
      wxcode: null
    },
    onLaunch: function() {
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
      console.log('App Launch')
      this.getGiftList();
      this.getAreas();
    },
    onShow: async function() {
      if (!uni.getStorageSync('token')) {
        uni.setStorageSync('token', JSON.stringify(false))
      }
      this.getwxCode();
      this.autoUpdate();
    },
    onHide: function() {

    },
    methods: {
      ...mapMutationsCart(['updateGiftList']),
      ...mapMutationsAddress(['updateAddress', 'updateDefaultAddress', 'updateAreas']),
      // 赠品列表
      async getGiftList() {
        const {
          data: res
        } = await uni.$http.get('user_gifts/')
        // console.log(res.lists)
        if (res.code !== 200) return
        this.updateGiftList(res.lists)
      },
      async getAddressList() {
        const mobile = JSON.parse(uni.getStorageSync('userInfo')).mobile
        const {
          data: res
        } = await uni.$http.get('address_info/' + mobile + '/')
        if (res.code !== 200) return uni.$showMsg(res.msg)
        res.data.forEach(item => {
          item.address = []
          item.address.push({
            text: item.province,
            value: (item.province_id).toString()
          })
          item.address.push({
            text: item.city,
            value: (item.city_id).toString()
          })
          item.address.push({
            text: item.district,
            value: (item.district_id).toString()
          })
        })
        // console.log(res.data)
        this.updateAddress(res.data)
        this.updateDefaultAddress(res.default_address)
      },
      // 省市区列表
      async getAreas() {
        if (uni.getStorageSync('areas')) return
        const {
          data: res
        } = await uni.$http.get('areas/')
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.errmsg)
        const arr = res.options
        arr.forEach(item => {
          item.text = item.label
          if (item.children) {
            item.children.forEach(item2 => {
              item2.text = item2.label
              if (item2.children) {
                item2.children.forEach(item3 => {
                  item3.text = item3.label
                })
              }
            })
          }
        })
        this.updateAreas(arr)
      },
      //获取微信登录code
      async getwxCode() {
        const [err, coderes] = await uni.login({
          Pprovider: 'weixin'
        }).catch(err => err);
        this.globalData.wxcode = coderes.code;
      },
      /**
      
         * 小程序检查更新
      
         */

      autoUpdate: function() {

        var that = this

        // 获取小程序更新机制兼容

        if (wx.canIUse('getUpdateManager')) {

          const updateManager = wx.getUpdateManager()

          //1. 检查小程序是否有新版本发布

          updateManager.onCheckForUpdate(function(res) {

            // 请求完新版本信息的回调

            if (res.hasUpdate) {

              //检测到新版本，需要更新，给出提示

              wx.showModal({

                title: '更新提醒',

                content: '已检测到新版本，是否下载并重启小程序？',

                success: function(res) {

                  if (res.confirm) {

                    //2. 用户确定下载更新小程序，小程序下载及更新静默进行

                    that.downLoadAndUpdate(updateManager)

                  } else if (res.cancel) {

                    //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了

                    wx.showModal({

                      title: '更新提醒',

                      content: '本次更新因改动较大，旧版本某些功能可能无法正常访问的哦~',

                      showCancel: false, //隐藏取消按钮

                      confirmText: "确认更新", //只保留确定更新按钮

                      success: function(res) {

                        if (res.confirm) {

                          //下载新版本，并重新应用

                          that.downLoadAndUpdate(updateManager)

                        }

                      }

                    })

                  }

                }

              })

            } else {

            }

          })

        } else {

          // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示

          wx.showModal({

            title: '错误',

            content: '当前微信版本过低，无法使用本小程序，请升级到最新微信版本后重试！'

          })

        }

      },

      /**
      
         * 下载小程序新版本并重启应用
      
         */

      downLoadAndUpdate: function(updateManager) {

        wx.showLoading();

        //静默下载更新小程序新版本

        updateManager.onUpdateReady(function() {

          wx.hideLoading()

          //新的版本已经下载好，调用 applyUpdate 应用新版本并重启

          updateManager.applyUpdate()

        })

        updateManager.onUpdateFailed(function() {

          wx.hideLoading()

          // 新的版本下载失败

          wx.showModal({

            title: '检测到新版本了哦~',

            content: '新版本已经上线啦~ 请您删除当前小程序重新打开哦~',

          })

        })

      }
    }
  }
</script>

<style>
  view {
    --color-money: tomato;
  }

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
