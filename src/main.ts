import Vue from 'vue';
import { Route } from "vue-router";
import '@/plugins';
import { createStore } from "./store/index";
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { AuthorizeOptions } from 'auth0-js';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import AuthPlugin from "@/plugins/auth";
import './registerServiceWorker';

import { domain, clientId, sentry_dsn } from "../appsettings.json";


const store = createStore();

Sentry.init({
  dsn: sentry_dsn,
  integrations: [new VueIntegration({ Vue, attachProps: true })],
});

router.beforeEach((to: Route, from: Route, next: any) => {
  if (to.path === "/" || to.path === "/auth/external/callback" || to.path === "/stream" || to.path === "/projects" || to.path === "/music" || store.getters["UserProfile/isAuthenticated"]) {
    return next();
  }
  const options: AuthorizeOptions = {
    redirectUri: to.path,
  };
  Vue.prototype.$auth.login(options);
});

Vue.config.productionTip = false;

const VueApp: any = Vue;

VueApp.use(AuthPlugin);

new VueApp({
  vuetify,
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');
