import Vue from 'vue'
import Router from 'vue-router'

import SearchPage from '../components/Search/Search.vue'
import HomePage from '../components/Home/Home.vue'
import DetailPage from '../components/Movies/Detail.vue'
import LoginPage from '../components/Login/Login.vue'
import RegisterPage from '../components/Register/Register.vue'
import ProfilePage from '../components/Profile/Profile.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/login', component: LoginPage},
    { path: '/register', component: RegisterPage},
    { path: '/search/:title/:type', component: SearchPage, name: 'search' },
    { path: '/detail/:id/:type', component: DetailPage, props: true, name: 'detail'},
    { path: '/profile/:id', component: ProfilePage },

    { path: '*', redirect: '/'}
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/login', '/register', '/'];
  const authorizedPages = [''];
  const authRequired = authorizedPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    // return next('/login');
    return
  }

  next();
})