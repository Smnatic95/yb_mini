(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"146c":function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(r("a34a")),a=r("2f62");function o(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t,r,n,a,o,c){try{var i=e[o](c),u=i.value}catch(s){return void r(s)}i.done?t(u):Promise.resolve(u).then(n,a)}function f(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function c(e){s(o,n,a,c,i,"next",e)}function i(e){s(o,n,a,c,i,"throw",e)}c(void 0)}))}}var d=(0,a.createNamespacedHelpers)("cart"),l=d.mapMutations,p=(0,a.createNamespacedHelpers)("address"),h=p.mapMutations,b={onLaunch:function(){e.getSystemInfo({success:function(t){var r=t.model;-1!=r.search("iPhone X")?e.setStorageSync("isIphoneX",!0):e.setStorageSync("isIphoneX",!1)}}),console.log("App Launch"),this.getGiftList(),this.getAreas()},onShow:function(){var t=f(n.default.mark((function t(){return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log("App Show"),e.getStorageSync("token")||e.setStorageSync("token",JSON.stringify(!1));case 2:case"end":return t.stop()}}),t)})));function r(){return t.apply(this,arguments)}return r}(),onHide:function(){console.log("App Hide")},methods:i(i(i({},l(["updateGiftList"])),h(["updateAddress","updateDefaultAddress","updateAreas"])),{},{getGiftList:function(){var t=this;return f(n.default.mark((function r(){var a,o;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.$http.get("user_gifts/");case 2:if(a=r.sent,o=a.data,200===o.code){r.next=6;break}return r.abrupt("return");case 6:t.updateGiftList(o.lists);case 7:case"end":return r.stop()}}),r)})))()},getAddressList:function(){var t=this;return f(n.default.mark((function r(){var a,o,c;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=JSON.parse(e.getStorageSync("userInfo")).mobile,r.next=3,e.$http.get("address_info/"+a+"/");case 3:if(o=r.sent,c=o.data,200===c.code){r.next=7;break}return r.abrupt("return",e.$showMsg(c.msg));case 7:c.data.forEach((function(e){e.address=[],e.address.push({text:e.province,value:e.province_id.toString()}),e.address.push({text:e.city,value:e.city_id.toString()}),e.address.push({text:e.district,value:e.district_id.toString()})})),t.updateAddress(c.data),t.updateDefaultAddress(c.default_address);case 10:case"end":return r.stop()}}),r)})))()},getAreas:function(){var t=this;return f(n.default.mark((function r(){var a,o,c;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!e.getStorageSync("areas")){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,e.$http.get("areas/");case 4:if(a=r.sent,o=a.data,200===o.code){r.next=8;break}return r.abrupt("return",e.$showMsg(o.errmsg));case 8:c=o.options,c.forEach((function(e){e.text=e.label,e.children&&e.children.forEach((function(e){e.text=e.label,e.children&&e.children.forEach((function(e){e.text=e.label}))}))})),t.updateAreas(c);case 11:case"end":return r.stop()}}),r)})))()}})};t.default=b}).call(this,r("543d")["default"])},"486e":function(e,t,r){"use strict";(function(e,t){r("b43d");var n=i(r("66fd")),a=i(r("c264")),o=i(r("dbfc")),c=r("c7bb");function i(e){return e&&e.__esModule?e:{default:e}}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){f(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}n.default.filter("tofixed2",(function(e){return e.toFixed(2)})),e.$http=c.$http,e.$baseUrl="https://ybmini.oripetlife.com/",e.$baseUrl1="https://7n.oripetlife.com/",c.$http.baseUrl=e.$baseUrl,c.$http.beforeRequest=function(t){e.showLoading({title:"数据加载中..."})},c.$http.afterRequest=function(){e.hideLoading()},e.$showMsg=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"加载失败",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"none";e.showToast({title:t,duration:r,icon:n})};var d={methods:{viewNavigate:function(t){e.navigateTo({url:t,fail:function(e){console.log(t+"跳转出错",e)}})}}};n.default.mixin(d),n.default.config.productionTip=!1,a.default.mpType="app";var l=new n.default(s(s({},a.default),{},{store:o.default}));t(l).$mount()}).call(this,r("543d")["default"],r("543d")["createApp"])},"5f5e":function(e,t,r){"use strict";r.r(t);var n=r("146c"),a=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},"8bc1":function(e,t,r){},acc6:function(e,t,r){"use strict";var n=r("8bc1"),a=r.n(n);a.a},c264:function(e,t,r){"use strict";r.r(t);var n=r("5f5e");for(var a in n)"default"!==a&&function(e){r.d(t,e,(function(){return n[e]}))}(a);r("acc6");var o,c,i,u,s=r("f0c5"),f=Object(s["a"])(n["default"],o,c,!1,null,null,null,!1,i,u);t["default"]=f.exports}},[["486e","common/runtime","common/vendor"]]]);