<template>
  <view class="page">
    <view v-for="(item,i) in cartList" :key='i'>
      <text>{{item.title}}x{{item.number}}---￥{{item.price}}</text>
    </view>


    <view class="btn-box">
      <button @click="showPopup">购买年卡</button>
    </view>

    <uni-popup ref="popup" type="center">
      <sale-code></sale-code>
    </uni-popup>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        cartList: [{
          title: '原本成猫粮',
          number: '12',
          price: '2388.00'
        }, {
          title: '原本成猫粮',
          number: '12',
          price: '2388.00'
        }, {
          title: '原本成猫粮',
          number: '12',
          price: '2388.00'
        }, {
          title: '原本成猫粮',
          number: '12',
          price: '2388.00'
        }, ]
      };
    },
    methods: {
      showPopup() {
        this.$refs.popup.open()
      },
    }
  }
</script>

<style lang="scss">
  .btn-box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;

    button {
      height: 50px;
      margin: 0 30px;
      line-height: 50px;
      color: #FFFFFF;
      background-color: #294D7C;
      border-radius: 25px;

      &::after {
        border: 0;
      }
    }
  }
</style>
