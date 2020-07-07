import Vue from 'vue';
import '@/plugins';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';


Vue.config.productionTip = false;
const VueApp: any = Vue;

new VueApp({
  vuetify,
  router,
  store,
  render: (h: any) => h(App),
}).$mount('#app');
