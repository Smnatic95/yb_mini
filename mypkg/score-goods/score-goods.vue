<template>
  <view class="page">
    <image class="score_image" :src="score_image" mode="widthFix"></image>
  </view>
</template>

<script>
  export default{
    data(){
      return {
        score_image:"/static/images/score.jpg"
      }
    },
    onLoad(){
      console.log(111111111111111111)
    }
  }
</script>

<style lang="scss">
  .score_image{
    width: 100vw;
  }
</style>
