import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Projects from '@/views/Projects.vue';
import Stream from '@/views/Stream.vue';
import Register from '@/views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import NotFound from '@/views/NotFound.vue';
import ExternalCallback from '@/views/auth/ExternalCallback.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/stream',
      name: 'stream',
      component: Stream,
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
    },
    {
      path: '/auth/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/auth/external/callback',
      name: 'external-callback',
      component: ExternalCallback,
    },
  ],
});
