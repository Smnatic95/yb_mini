<template>
  <view class="pages">
    <view class="pic">
      <image :src=" topImg " mode=""></image>
    </view>
    <home-goodsitem :goodsList='moreList'></home-goodsitem>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        pageTitle: '',
        moreList: [],
        topImg:null
      };
    },

    onLoad(option) {
      this.pageTitle = option.type || '热门推荐'
      switch (option.type) {
        case 'hot':
          this.topImg = uni.$baseUrl1+'yb-top-image-1.jpg'
          this.pageTitle = '热门榜单'
          break;
        case 'new':
           this.topImg = uni.$baseUrl1+'yb-top-image-2.jpg'
          this.pageTitle = '首发新品'
          break;
      }
      uni.setNavigationBarTitle({
        title: this.pageTitle
      })

      this.getGoodsList()
    },
    methods: {
      async getGoodsList() {
        // console.log(this.pageTitle)
        let url = 'user_hots_skus/'
        if (this.pageTitle === '热门榜单') url = 'user_hots_skus/'
        if (this.pageTitle === '首发新品') url = 'user_news_skus/'
        const {
          data: res
        } = await uni.$http.get(url)
        // console.log(res)
        if (res.code !== 200) return uni.$showMsg(res.msg)
        
        // 售空
        const arr1 = res.lists.filter(x => x.stock > 0)
        const arr2 = res.lists.filter(x => x.stock == 0)
        this.moreList = [...arr1, ...arr2]
        
        // this.moreList = res.lists
        // 四袋装
        this.moreList.forEach(item => {
          if (item.id == 32 || item.id == 33 || item.id == 34) {
            item.market_price = (Number(item.market_price) * 4).toFixed(2)
            item.price = (Number(item.price) * 4).toFixed(2)
          }
        })
      }
    }

  }
</script>

<style lang="scss">
  .pages {
    padding-bottom: 100px;
  }

  .pic {
    min-height: 250rpx;
    overflow: hidden;
    margin-bottom: 25rpx;
    image {
      width: 750rpx;
    }
  }
</style>
