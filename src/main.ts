import Vue from 'vue';
import '@/plugins/vuetify';
import '@/plugins/api';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
const LoadScript = require('vue-plugin-load-script');

Vue.config.productionTip = false;

Vue.use(LoadScript);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
