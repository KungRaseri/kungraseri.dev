import Vue from 'vue';
import Vuex from 'vuex';
import {
  VueAuthenticate
} from 'vue-authenticate';
import VueAxios from 'vue-axios';

import axios from 'axios';

Vue.use(VueAxios, axios)
Vue.use(Vuex)

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: 'http://localhost:4000'
})


export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {}
  },
  mutations: {

  },
  actions: {
    login(context, payload) {
      vueAuth.login(payload.user, payload.requestOptions).then((response => {
        // eslint-disable-next-line
        console.log(response);
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated()
        });
      }));
    }
  },
  getters: {
    isAuthenticated: () => {
      return vueAuth.isAuthenticated();
    }
  }
});