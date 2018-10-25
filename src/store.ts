import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence<any>({
  key: 'dashboard',
  storage: localStorage,
});

const store = new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    isAuthenticated: false,
    account: {},
    token: '',
  },
  mutations: {
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
    INITIALIZE_STORE: (state) => {
      state = state;
    },
  },
  actions: {
    initializeStore: ({ commit }) => {
      commit('INITIALIZE_STORE');
    },
  },
});

export default store;
