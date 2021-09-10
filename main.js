import Vue from 'vue'
import App from './App'
import store from './store/store.js'


Vue.filter("tofixed2",(data)=>{
  return data.toFixed(2);
})

// 配置网络请求
import {
  $http
} from '@escook/request-miniprogram'
uni.$http = $http

 // uni.$baseUrl = 'http://192.168.1.103:8080/';
uni.$baseUrl = 'https://ybmini.oripetlife.com/';
uni.$baseUrl1 = 'https://7n.oripetlife.com/';

$http.baseUrl = uni.$baseUrl;
// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

// 消息提示
uni.$showMsg = function(title = '加载失败', duration = 1500, icon = 'none') {
  uni.showToast({
    title: title,
    duration: duration,
    icon: icon
  })
}


var globalMixin = {
  methods:{
    viewNavigate(url) {
      uni.navigateTo({
        url,
        fail(err) {
          console.log(url + '跳转出错' ,err)
        }
      })
    }
  }
}

Vue.mixin(globalMixin)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
app.$mount()
