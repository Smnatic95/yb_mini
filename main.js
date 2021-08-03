import Vue from 'vue'
import App from './App'
import store from './store/store.js'

// 配置网络请求
import {
  $http
} from '@escook/request-miniprogram'
uni.$http = $http

// 'https://7n.oripetlife.com/'
// $http.baseUrl = 'http://192.168.1.28:8080/'
$http.baseUrl = ' http://192.168.1.52:8080/'
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

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store,
})
app.$mount()
