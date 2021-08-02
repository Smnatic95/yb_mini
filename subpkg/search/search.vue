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
        <view class="item" v-if='is_icon' v-for="(item,i) in search_history" :key='i' @click="history(item)">{{item}}
        </view>
        <view class="item" v-if="!is_icon" v-for="(item,i) in search_history" :key='i' @click="clearHistory(item)">
          {{item}}
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
      <view class="item" @click="gotoGoodsDetail(item)" v-for="item in goodsList" :key='item.id'>
        <view class="pic">
          <image :src="'https://7n.oripetlife.com/'+item.image" mode=""></image>
        </view>
        <view class="text">
          <view class="info">
            <view class="title">{{item.name}}</view>
            <view class="intro">{{item.introduction}}</view>
          </view>
          <view class="num">
            <view class="price">￥<text>{{item.market_price}}</text></view>
            <image src="/static/huiyuanjia.png" mode=""></image>
            <view class="price-dis">￥{{item.price}}</view>
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
        console.log(this.newSuggest)
      }
    },
    onLoad() {},
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
          console.log(res)
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
            goodsList[i]['price'] = String((Number(goodsList[i]['price']) * 4).toFixed(2))
          }
        }
        this.goodsList = goodsList;

        console.log(this.search_history)
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
        console.log(item)
        if (!item) {
          this.search_history = []
          // uni.setStorageSync('search_history', "[]")
        } else {
          const set = new Set(this.search_history)
          set.delete(item)
          console.log(set)
          // set.add(item)
          this.search_history = (Array.from(set)).reverse()
          // uni.setStorageSync('search_history', JSON.stringify(this.search_history))
        }
        uni.setStorageSync('search_history', JSON.stringify(this.search_history))
      },


      gotoGoodsDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?id='+item.id+'&goods_stock='+item.stock
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .search-history {
    .text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10rpx 0 0 30rpx;
      height: 57px;
      box-sizing: border-box;

      text {
        font-size: 32rpx;
        font-weight: bold;
        line-height: 20px;
        color: #242424;
      }

      uni-icons {
        padding: 30rpx;
      }

      .else {
        display: flex;
        align-items: center;
        font-size: 12px;
        // padding: 30rpx;

        >view {
          display: flex;
          align-items: center;
          height: 10px;
          padding: 0 10px;
        }

        .else1 {
          border-right: 1px solid #888;
          color: #888;
        }

        .else2 {
          color: tomato;
        }
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      padding-left: 30rpx;
      margin-top: 10px;

      .item {
        position: relative;
        // display: flex;
        // align-items: center;
        display: flex;
        align-items: center;
        height: 35px;
        line-height: 35px;
        padding: 0 32rpx;
        margin: 0 20rpx 20rpx 0;
        font-size: 24rpx;
        font-weight: 500;
        color: #626262;
        background-color: #F5F5F5;
        border-radius: 5px;
        box-sizing: border-box;

        .icon {
          position: absolute;
          right: 5px;
          top: 0;
          // transform: translateY(-50%);
          // padding: 0 10px;
          // padding-right: 10px;
          // padding-left: 10px;
          height: 100%;
          font-size: 14px;
          // margin-left: 10px;
          // margin-right: ;
          color: #ccc;
          background-color: #F5F5F5;
          border-radius: 5px;
        }
      }
    }
  }

  .search-suggest {
    padding: 0 30rpx;

    .list {
      padding-bottom: 30rpx;
      font-size: 15px;
      font-weight: 500;
      color: #242424;
    }
  }

  .search-list {
    flex: 1;
    padding-top: 20rpx;
    background-color: #F6F6F6;

    .item {
      display: flex;
      // height: 240rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      background-color: #FFFFFF;

      .pic {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180rpx;
        height: 180rpx;
        margin-right: 34rpx;
        background: #F0F0F0;
        border-radius: 6px;

        image {
          width: 80%;
          height: 80%;
        }
      }

      .text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .info {
          .title {
            padding-bottom: 6rpx;
            font-size: 30rpx;
            font-weight: bold;
            color: #000104;
          }

          .intro {
            font-size: 24rpx;
            font-weight: 500;
            color: #C0C8D3;
          }
        }

        .num {
          display: flex;
          align-items: flex-end;

          .price {
            font-size: 26rpx;
            font-weight: 700;
            color: #294D7C;
            margin-bottom: -6rpx;

            text {
              font-size: 40rpx;
            }
          }

          image {
            width: 46rpx;
            height: 28rpx;
            margin-left: 10rpx;
            margin-right: 20rpx;
            margin-bottom: 6rpx;
          }

          .price-dis {
            font-size: 12px;
            font-weight: 500;
            text-decoration: line-through;
            color: #C0C8D3;
          }
        }
      }
    }
  }
</style>
