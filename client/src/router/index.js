import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/loginpage'
import signUp from '@/components/signup'
import NotFoundPage from '@/components/NotFoundPage'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/signup',
      name: 'Signup',
      component: signUp
    },
    {
      path: '/main',
      name: 'Main',
      meta: { requiresAuth: true },
      component: Home
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
})
