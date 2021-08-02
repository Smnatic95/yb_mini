export default {

  onLoad() {
    let page = getCurrentPages()
    const parentId = uni.getStorageSync('parent_id')
    uni.setStorageSync('parent_id', parentId ? parentId : page[0].options.parent_id)
  },

  // methods: {
  onShareAppMessage(e) {
    const id = uni.getStorageSync('id')
    const is_staff = uni.getStorageSync('is_staff')
    const parent_id = uni.getStorageSync('parent_id')

    let p_id = 0
    if (!parent_id && !id && !is_staff) p_id = 0
    if (parent_id == 0) {
      if (is_staff) {
        p_id = id
      } else {
        p_id = 0
      }
    } else {
      p_id = parent_id
    }
    var obj = {
      title: '原本宠物生活',
      imageUrl:'/static/pics/share.jpg',
      path: '/pages/home/home?parent_id=' + p_id,
    }
    if (e.from == 'button') {
      obj.path =
        `/subpkg/goods_detail/goods_detail?id=${this.goods_id}&goods_stock=${this.goods_stock}&goods_img=${this.goods_img}&parent_id=${p_id}`
    }
    console.log(obj.path)
    return obj
  },
  // }

}
