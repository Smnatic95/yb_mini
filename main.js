import Vue from 'vue'
import App from './App'
import store from './store/store.js'

// 配置网络请求
import {
  $http
} from '@escook/request-miniprogram'
uni.$http = $http

$http.baseUrl = 'http://192.168.1.9:8080/'
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

// 封装提示消息
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
