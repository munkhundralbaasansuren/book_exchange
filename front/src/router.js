import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import(/* webpackChunkName: "about" */ './views/Books.vue')
    },
    {
      path: '/exchanges',
      name: 'exchanges',
      component: () => import(/* webpackChunkName: "about" */ './views/Exchanges.vue')
    },
    {
      path: '/team',
      name: 'team',
      component: () => import(/* webpackChunkName: "about" */ './views/Team.vue')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) return next('/login');
  else if(!authRequired && loggedIn) return next('/dashboard');

  next();
});

export default router;