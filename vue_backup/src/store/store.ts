import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { State } from "@/interfaces/State";

import { UserProfile } from "@/store/modules";


Vue.use(Vuex);

const store: StoreOptions<State> = {
  plugins: [createPersistedState()],
  modules: {
    UserProfile,
  },
};

export const createStore = () => new Vuex.Store<State>(store);
