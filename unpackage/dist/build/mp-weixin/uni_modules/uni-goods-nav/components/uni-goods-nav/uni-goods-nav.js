(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav"],{"0aae":function(n,t,o){"use strict";var e=o("0e37"),u=o.n(e);u.a},"0e37":function(n,t,o){},"96d6":function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={name:"UniGoodsNav",props:{options:{type:Array,default:function(){return[{icon:"shop",text:"店铺"},{icon:"cart",text:"购物车"}]}},buttonGroup:{type:Array,default:function(){return[{text:"加入购物车",backgroundColor:"#ffa200",color:"#fff"},{text:"立即购买",backgroundColor:"#ff0000",color:"#fff"}]}},fill:{type:Boolean,default:!1}},methods:{onClick:function(n,t){this.$emit("click",{index:n,content:t})},buttonClick:function(t,o){n.report&&n.report(o.text,o.text),this.$emit("buttonClick",{index:t,content:o})}}};t.default=o}).call(this,o("543d")["default"])},cfce:function(n,t,o){"use strict";o.r(t);var e=o("96d6"),u=o.n(e);for(var c in e)"default"!==c&&function(n){o.d(t,n,(function(){return e[n]}))}(c);t["default"]=u.a},d3c6:function(n,t,o){"use strict";o.d(t,"b",(function(){return u})),o.d(t,"c",(function(){return c})),o.d(t,"a",(function(){return e}));var e={uniIcons:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(o.bind(null,"39de"))}},u=function(){var n=this,t=n.$createElement;n._self._c},c=[]},dbb6:function(n,t,o){"use strict";o.r(t);var e=o("d3c6"),u=o("cfce");for(var c in u)"default"!==c&&function(n){o.d(t,n,(function(){return u[n]}))}(c);o("0aae");var i,r=o("f0c5"),a=Object(r["a"])(u["default"],e["b"],e["c"],!1,null,"4baddaf0",null,!1,e["a"],i);t["default"]=a.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav-create-component',
    {
        'uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("dbb6"))
        })
    },
    [['uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav-create-component']]
]);
