<template>
  <view class="page">
    <button class="number-btn" plain open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
      <my-logincontent></my-logincontent>
    </button>

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  export default {
    name: "my-notlogin",
    data() {
      return {};
    },
    computed: {
      ...mapState('user', ['token']),
    },
    methods: {
      ...mapMutations('user', ['undateToken', 'updateUserInfo']),

      async getPhoneNumber(e) {
        const [err, res] = await uni.login().catch(err => err)
        if (e.detail.errMsg == "getPhoneNumber:ok") {
          const {
            data: res1
          } = await uni.$http.post('login/', {
            code: res.code,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            // sessionKey: res1.data.session_key,
          })
          console.log(res1)

          // const {
          //   data: res2
          // } = await uni.$http.get('user_phone/' + res1.user_list[0].mobile + '/')
          // console.log(res2)

          if (res1.code !== 200) {
            this.undateToken(false)
            uni.$showMsg('授权失败！请重试')
          } else {
            this.undateToken(true)
            this.updateUserInfo(res1.user_list[0])
          }
        }

        // if (e.detail.iv) {
        //   this.undateToken(true)
        // } else {
        //   this.undateToken(false)
        // }

      },


    }
  }
</script>

<style lang="scss"></style>
