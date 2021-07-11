export default {
  namespaced: true,

  state: () => ({
    scrollList: [{
        title: '全部'
      }, {
        title: '犬主粮',
        type: 0
      }, {
        title: '猫主粮',
        type: 1
      }, {
        title: '冻干',
        type: 2
      }, {
        title: '罐头',
        type: 6
      }, {
        title: '保健品',
        type: 3
      }, {
        title: '猫砂',
        type: 4
      }, {
        title: '药品',
        type: 5
      },
      // {
      //   title: '猫粮试吃',
      //   type: 7
      // }, {
      //   title: '犬粮试吃',
      //   type: 8
      // },{
      //   title: '赠品',
      //   type: 9
      // }, {
      //   title: '其它',
      //   type: 10
      // }
    ],
    search_history: JSON.parse(uni.getStorageSync('search_history') || "[]"),

  }),
  
  mutations:{
    
  },

}
