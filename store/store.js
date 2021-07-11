import Vue from 'vue'
import Vuex from 'vuex'

import moduleCart from './cart.js'
import moduleAddress from './address.js'
import moduleUser from './user.js'
import modulePet from './pet.js'
import moduleHome from './home.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cart: moduleCart,
    address: moduleAddress,
    user: moduleUser,
    pet: modulePet,
    home: moduleHome
  },
})

export default store
