import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/loginpage'
import signUp from '@/components/signup'
import NotFoundPage from '@/components/NotFoundPage'

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
      path: '*',
      component: NotFoundPage
    }
  ]
})
