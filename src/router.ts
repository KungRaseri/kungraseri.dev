import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Project from './views/Project.vue';
import Register from './views/auth/Register.vue';
import Login from './views/auth/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/projects',
      name: 'projects',
      component: Project,
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
  ],
});
