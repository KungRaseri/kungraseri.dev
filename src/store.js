import Vue from 'vue';
import Vuex from 'vuex';
import {
  UPDATE_ACCOUNT,
  UPDATE_IS_AUTHENTICATED
} from './store/mutation-types';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    account: {},
    token: {}
  },
  mutations: {
    [UPDATE_ACCOUNT](state, account) {
      state.account = account;
    },
    [UPDATE_IS_AUTHENTICATED](state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    }
  },
  actions: {
    updateAccount({
      commit
    }, payload) {
      commit(UPDATE_ACCOUNT, payload);
    },
    updateIsAuthenticated({
      commit
    }, payload) {
      commit(UPDATE_IS_AUTHENTICATED, payload);
    }
  },
  getters: {
    getAccount: (state) => {
      return state.account;
    },
    isAuthenticated: (state) => {
      return state.isAuthenticated
    }
  }
});