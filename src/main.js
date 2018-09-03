import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import VueAxios from 'vue-axios';
import axios from 'axios';

import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import regular from "@fortawesome/fontawesome-free-regular";
import brands from "@fortawesome/fontawesome-free-brands";

Vue.component('font-awesome-icon', FontAwesomeIcon);

library.add(faCoffee, regular, brands);

import api from './services/api.js';

Vue.prototype.$api = api;

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  components: {
    App,
  },
  render: h => h(App)
}).$mount('#app')