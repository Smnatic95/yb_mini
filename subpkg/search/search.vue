<template>
  <view class="search-page">
    <uni-search-bar placeholder="搜索商品" cancelButton='none' :radius="5" v-model="searchValue" @confirm="search"
                    @input="getSearchSuggest" @clear="clear">
    </uni-search-bar>

    <!-- 搜素历史 -->
    <view class="search-history" v-if="suggestList.length==0&&goodsList.length==0">
      <view class="text">
        <text>搜索历史</text>
        <uni-icons type="trash" size="15" color="#FF4057" v-if="is_icon" @click="is_icon=false"></uni-icons>
        <view class="else" v-else>
          <view class="else1" @click="clearHistory()">全部删除</view>
          <view class="else2" @click="is_icon=true">完成</view>
        </view>
      </view>
      <view class="list">
        <view class="item" v-if='is_icon' v-for="(item,i) in search_history" :key='i' @click="history(item)">{{ item }}
        </view>
        <view class="item" v-if="!is_icon" v-for="(item,i) in search_history" :key='i' @click="clearHistory(item)">
          {{ item }}
          <view class="icon">x</view>
        </view>
      </view>
    </view>

    <!-- 搜索建议 -->
    <view class="search-suggest" v-if="goodsList.length==0">
      <view class="list" v-for="(item,i) in newSuggest" :key='i'>
        <rich-text :nodes="item.named" @click="onSearch(item.name)"></rich-text>
      </view>
    </view>

    <!-- 搜索结果 -->
    <view class="search-list" v-if="goodsList.length>0">
      <view class="item" v-for="(item,i) in goodsList" :key='i' @click="gotoGoodsDetail(item)">
        <view class="pic">
          <image :src="'https://7n.oripetlife.com/'+item.image"></image>
        </view>
        <view class="text">
          <view class="info">
            <view class="title">{{ item.name }}</view>
            <view class="intro">{{ item.introduction }}</view>
          </view>
          <view class="num">
            <view class="price">￥
              <text>{{ item.market_price }}</text>
            </view>
            <image src="https://7n.oripetlife.com/huiyuanjia.png"></image>
            <view class="price-dis">￥{{ item.price }}</view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      timer: null, //防抖
      is_icon: true,
      searchValue: '',
      search_history: JSON.parse(uni.getStorageSync('search_history') || "[]"),
      suggestList: [],
      goodsList: [],
    };
  },
  computed: {
    // ...mapState('home', ['search_history']),
    // 关键字高亮
    newSuggest() {
      var arr = []
      if (this.searchValue === '') return
      var reg = new RegExp(this.searchValue, "g")
      // if (reg === '') return
      this.suggestList.forEach(item => {
        arr.push({
          name: item.name,
          named: item.name.replace(reg, "<span style='color:#294D7C;'> " + this.searchValue + " </span>")
        })
      })
      return arr
      // console.log(this.newSuggest)
    },

  },
  methods: {

    // 搜索建议列表
    async getSearchSuggest() {
      this.goodsList = []
      if (this.searchValue == '') return this.suggestList = []
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const {
          data: res
        } = await uni.$http.post('query_sku/', {
          query: this.searchValue
        })
        // console.log(res)
        if (res.code !== 200) {
          this.suggestList = []
          return uni.$showMsg(res.msg)
        }
        this.suggestList = res.lists
      }, 700)
    },

    //搜索 商品
    async onSearch(keyword) {

      // 搜索历史
      const set = new Set(this.search_history)
      set.delete(keyword)
      set.add(keyword)
      this.search_history = (Array.from(set)).reverse()
      uni.setStorageSync('search_history', JSON.stringify(this.search_history))

      this.searchValue = keyword

      const {data: res} = await uni.$http.post('query_sku_name/', {query: keyword})
      this.suggestList = []
      let goodsList = res.lists

      for (let i = 0; i < goodsList.length; i++) {
        if (goodsList[i]['id'] === 32 || goodsList[i]['id'] === 33 || goodsList[i]['id'] === 34) {
          goodsList[i]['market_price'] = String((Number(goodsList[i]['market_price']) * 4).toFixed(2))
        }
      }
      this.goodsList = goodsList;

    },
    search(e) {
      // console.log(e.value)
      this.onSearch(e.value)
    },
    clear(e) {
      // console.log(e)
      this.goodsList = []
      this.suggestList = []
    },

    // 点击搜索历史
    history(kw) {
      // console.log(kw)
      this.searchValue = kw
      this.onSearch(kw)
      const set = new Set(this.search_history)
      set.delete(kw)
      set.add(kw)
      this.search_history = (Array.from(set)).reverse()
      uni.setStorageSync('search_history', JSON.stringify(this.search_history))
    },

    // 删除搜索历史
    clearHistory(item) {
      // console.log(item)
      if (!item) {
        this.search_history = []
        // uni.setStorageSync('search_history', "[]")
      } else {
        const set = new Set(this.search_history)
        set.delete(item)
        // console.log(set)
        // set.add(item)
        this.search_history = (Array.from(set)).reverse()
        // uni.setStorageSync('search_history', JSON.stringify(this.search_history))
      }
      uni.setStorageSync('search_history', JSON.stringify(this.search_history))
    },

    gotoGoodsDetail(item) {
      // console.log(item)
      // return
      uni.navigateTo({
        url: `/subpkg/goods_detail/goods_detail?id=${item.id}&goods_stock=${item.stock}&goods_img=${item.image}`
      })
    }
  }
}
</script>

<style lang="scss">
@import "search";
</style>
