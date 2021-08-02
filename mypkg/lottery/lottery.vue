<template>
  <view>
    <button type="default" @click="onEnroll">报名抽奖</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {};
    },
    onShow() {
      this.onDraw()
    },
    methods: {
      // 点击报名
      onEnroll() {
        var date = new Date()
        var day = date.getDate()
        console.log(day)
        if (day < 25) return uni.$showMsg('未到报名时间！每月25号开始报名！')
      },

      // 开奖
      onDraw() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let d = new Date(year, month, 0);
        
        let full_day = d.getDate()
        let day = date.getDate()
        if (day !== full_day) return

        let timer = setInterval(() => {
          let date = new Date();
          let hh = date.getHours()
          let mm = date.getMinutes()
          let ss = date.getSeconds()
          console.log(hh, mm, ss)
          if (hh == 12 && mm == 0 && ss == 0) {
            console.log('开奖')
            clearInterval(timer)
          }
        }, 1000)

      },
    }
  }
</script>

<style lang="scss">

</style>
