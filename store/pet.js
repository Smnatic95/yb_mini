export default {
  namespaced: true,

  state: () => ({
    petList: JSON.parse(uni.getStorageSync('petList') || "[]"),
  }),

  mutations: {
    //更新宠物列表
    updatePetList(state, petList) {
      state.petList = petList;
      uni.setStorageSync('petList', JSON.stringify(state.petList));
      console.log('宠物列表', petList);
    }
  },

  actions: {
    async getpetlistFromOrigen(context, i) {
      let phone_id = JSON.parse(uni.getStorageSync('userInfo') || "{}").mobile;
      if (phone_id) {
        const {
          data: res
        } = await uni.$http.get('pet_info/' + phone_id + '/');
        res.data.forEach(pet => {
          pet.is_default = Boolean(pet.pet_id == res.default_pet);
        });
        //默认的排在前面
        context.commit('updatePetList', res.data.sort(a => a.is_default ? -1 : 1));
      } else {
        uni.$showMsg('请先绑定手机号');
      }
    },
    //删除宠物
    deletePetfromOrigen(context, id) {
      setTimeout(() => {
        context.commit('deletePet', id);
      }, 1000)
    }
  }


}
