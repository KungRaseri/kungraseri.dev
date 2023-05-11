import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import NotFound from '@/views/NotFound.vue';

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
      component: () => import(/* webpackChunkName: "Stream" */ '@/views/Stream.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import(/* webpackChunkName: "Projects" */ '@/views/Projects.vue'),
    },
    {
      path: '/music',
      name: 'music',
      component: () => import(/* webpackChunkName: "Music" */ '@/views/Music.vue'),
    },
    {
      path: '/games',
      name: 'games',
      component: () => import(/* webpackChunkName: "Games" */ '@/views/Games.vue'),
    },
    {
      path: '/games/legends-of-dranos',
      name: 'legends-of-dranos',
      component: () => import(/* webpackChunkName: "legends-of-dranos" */ '@/legends-of-dranos/views/Main.vue'),
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "Register" */ '@/views/auth/Register.vue'),
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "Login" */ '@/views/auth/Login.vue'),
    },
    {
      path: '/auth/external/callback',
      name: 'external-callback',
      component: () => import(/* webpackChunkName: "ExternalCallback" */ '@/views/auth/ExternalCallback.vue'),
    },
  ],
});
