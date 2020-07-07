import Vue from 'vue';
import { Route } from "vue-router";
import '@/plugins';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { AuthorizeOptions } from '@auth0/auth0-js'
import AuthPlugin from "@/plugins/auth";
import './registerServiceWorker';

import { domain, clientId } from "../auth_config.json";


router.beforeEach((to: Route, from: Route, next: any) => {
  if (to.path === "/" || to.path === "/auth/external/callback" || to.path === "/giveaway" || store.getters["UserProfile/isAuthenticated"]) {
    return next();
  }
  const options: AuthorizeOptions = {
    redirectUri: to.path,
  };
  Vue.prototype.$auth.login(options);
});

Vue.config.productionTip = false;

const VueApp: any = Vue;

new VueApp({
  vuetify,
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');
