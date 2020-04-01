import Vue from 'vue';
import Router from 'vue-router';

import AdminContainer from '@/containers/AdminContainer';

import LoginPage from '@/views/LoginPage';
import DashboardPage from '@/views/DashboardPage';

Vue.use(Router);

export const router = new Router({
  mode: "history",
  history: true,
  linkActiveClass: "active",
  routes: [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Home',
        component: AdminContainer,
        children: [
          {
            path: '/dashboard',
            name: 'DASHBOARD',
            component: DashboardPage
          }
        ]
    },
    {path: '/login', component: LoginPage, beforeEnter: clearStorage},
    // otherwise redirect to home
    {path: '*', redirect: '/dashboard'}
]
});


function clearStorage(to, from, next) {
  window.$cookies.remove('clientToken');
  window.localStorage.clear();
  next();
}

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const _self = window;
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = _self.$cookies.get('clientToken');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
});

