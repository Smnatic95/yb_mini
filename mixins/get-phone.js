import {
  mapState,
  mapMutations,
  mapActions,
  createNamespacedHelpers
} from 'vuex'
const {
  mapState: mapStateUser,
  // mapGetters: mapGettersUser,
  mapMutations: mapMutationsUser
} = createNamespacedHelpers('user')
const {
  mapState: mapStateCart,
  mapMutations: mapMutationsCart
} = createNamespacedHelpers('cart')
const {
  mapState: mapStateAddress,
  mapMutations: mapMutationsAddress
} = createNamespacedHelpers('address')

export default {
  data() {
    return {
      // code: '',
    };
  },
  computed: {
    ...mapStateUser(['token']),
    ...mapStateCart(['couponsList']),
  },
  methods: {
    ...mapMutationsUser(['undateToken', 'updateUserInfo']),
    ...mapMutationsCart(['updateCouponsList', 'updateVip']),
    ...mapMutationsAddress(['updateAddress', 'updateDefaultAddress']),
    ...mapActions('pet', ['getpetlistFromOrigen']),

    async getPhoneNumber(e) {
      const id = uni.getStorageSync('id');
      const is_staff = uni.getStorageSync('is_staff');
      const parent_id = uni.getStorageSync('parent_id');
      const [err, coderes] = await uni.login().catch(err => err)
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        var form = {
          code: coderes.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        }
        if (!parent_id && !id && !is_staff){
          form.parent_id = 0
        }
        if (parent_id == 0) {
          if (is_staff) {
            form.parent_id = id;
          }
        } else {
          form.parent_id = parent_id
        }
        
        const {
          data: res1
        } = await uni.$http.post('login/', form);

        if (res1.code !== 200) {
          this.undateToken(false);
          uni.$showMsg('授权失败！请重试')
        } else {
          this.undateToken(true);
          this.updateUserInfo(res1.user_list[0]);
          this.updateVip(res1.user_list[0].vip_active);
          uni.setStorageSync('id', res1.id);
          uni.setStorageSync('is_staff', res1.is_staff);
          console.log('存储parent_id', res1.parent_id);
          uni.setStorageSync('parent_id', res1.parent_id);
          //获取用户数据
          this.getCouponslList();
          this.getAddressList();
          this.getpetlistFromOrigen();
        }
      }
    },

    async getCouponslList() {
      const {
        mobile
      } = JSON.parse(uni.getStorageSync('userInfo'))
      const {
        data: res
      } = await uni.$http.get(`user_coupon/${mobile}/`)
      if (res.code !== 200) return uni.$showMsg(res.msg)
      let arr = res.lists
      if (res.lists && res.lists.length > 0) {
        res.lists.forEach(item => {
          if (item.coupon_id == 1) { // 转介绍
            item.price = 30
            item.min_price = 100
          } else if (item.coupon_id == 2) { // 新客
            item.price = 10
            item.min_price = 10
          } else if (item.coupon_id == 3) { // 会员福利
            item.price = 10
            item.min_price = 60
          } else if (item.coupon_id == 4) { // 不发
            item.price = 50
            item.min_price = 50
          } else if (item.coupon_id == 5) { // 答题
            item.price = 10
            item.min_price = 60
          } else if (item.coupon_id == 6) { // 买一送一
            item.price = 0
            item.min_price = 0
          } else if (item.coupon_id == 7) { // 会员福利
            item.price = 20
            item.min_price = 300
          }
        })
      }


      arr = res.lists
      this.updateCouponsList(arr)
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

  }

}
