import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['total']),
  },
  watch: {
    total: {
      handler(newVal) {
        this.setBadge()
      }
    }
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    // 页面徽标
    setBadge() {
      if (this.total > 0) {
        uni.setTabBarBadge({
          index: 2,
          text: this.total + ''
        })
      } else {
        uni.removeTabBarBadge({
          index: 2
        })
      }
    }
  }
}
