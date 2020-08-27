import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: []
  },
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  }
})

export default store