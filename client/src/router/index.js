import Vue from 'vue'
import Router from 'vue-router'
import PageLanding from '@/components/index'
// import Resto from '@/components/Resto'
// import RestoD from '@/components/RestoD'
import SignIn from '@/components/signin/index'
import SignUp from '@/components/signup/index'
import ListResto from '@/components/main/listresto'
import Profile from '@/components/main/myprofile'
import MainIndex from '@/components/main/index'
import Chpass from '@/components/main/chpass'
import Historyc from '@/components/main/history'
import Favorite from '@/components/main/favorite'
import RestoD from '@/components/restodetail'
import Booking from '@/components/main/booking'
import Myresto from '@/components/main/myresto/myresto'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageLanding',
      component: PageLanding
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: { checksAuth: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/restodetail',
      component: RestoD
    },
    {
      path: '/main',
      component: MainIndex,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          component: ListResto
        },
        {
          path: 'profile',
          component: Profile
        },
        {
          path: 'chpass',
          component: Chpass
        },
        {
          path: 'history',
          component: Historyc
        },
        {
          path: 'favorite',
          component: Favorite
        },
        {
          path: 'booking',
          component: Booking
        },
        {
          path: 'myresto',
          component: Myresto
        }
      ]
    }
  ]
})
