import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/loginpage'
import signUp from '@/components/signup'
import NotFoundPage from '@/components/NotFoundPage'
import Home from '@/components/home'
import Myresto from '@/components/MyResto/index'
import RestoInfo from '@/components/MyResto/restoinfo'
import RestoFac from '@/components/MyResto/restofac'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'loginPage',
      meta: { checksAuth: true },
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
      component: Home,
      children: [
        {
          path: 'myresto',
          name: 'MyResto',
          component: Myresto
        },
        {
          path: 'myresto/info',
          name: 'RestoInfo',
          component: RestoInfo
        },
        {
          path: 'myresto/fac',
          name: 'RestoFac',
          component: RestoFac
        }
      ]
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
})
