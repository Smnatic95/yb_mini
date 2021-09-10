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
      console.log('App Launch')
      this.getGiftList()
      this.getAreas()
    },
    onShow: async function() {
      console.log('App Show')
      if (!uni.getStorageSync('token')) {
        uni.setStorageSync('token', JSON.stringify(false))
      }
    },
    onHide: function() {
      console.log('App Hide')
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
      }
    }
  }
</script>

<style>
  
  view{
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
