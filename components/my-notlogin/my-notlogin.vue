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
  import phoneMix from '@/mixins/get-phone.js'

  export default {
    mixins: [phoneMix],
    name: "my-notlogin",
    data() {
      return {};
    },
    computed: {
      ...mapState('user', ['token']),
    },
    methods: {
      ...mapMutations('user', ['undateToken', 'updateUserInfo']),
    }

  }
</script>

<style lang="scss"></style>
