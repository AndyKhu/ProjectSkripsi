import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/loginpage'
import signUp from '@/components/signup'
import NotFoundPage from '@/components/NotFoundPage'
import Home from '@/components/home'
import Myresto from '@/components/MyResto/index'
import RestoInfo from '@/components/MyResto/restoinfo/index'
import ListResto from '@/components/listresto'

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
      meta: { requiresAuth: true },
      component: Home,
      children: [
        {
          path: '/',
          name: 'ListResto',
          component: ListResto
        },
        {
          path: 'myresto',
          name: 'MyResto',
          component: Myresto
        },
        {
          path: 'myresto/info',
          name: 'RestoInfo',
          component: RestoInfo
        }
      ]
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
})
