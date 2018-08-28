import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {}
  },
  mutations: {

  },
  actions: {},
  getters: {
    isAuthenticated: state => {
      return state.isAuthenticated;
    }
  }
})