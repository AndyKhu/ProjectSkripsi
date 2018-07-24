import Vue from 'vue'
import Router from 'vue-router'
import loginPage from '@/components/loginpage'
import signUp from '@/components/signup'
import NotFoundPage from '@/components/NotFoundPage'
import profilePage from '@/components/profilePage'
import historyPage from '@/components/historyPage'
import ChangePassword from '@/components/changePassword'
// Member
import Member from '@/components/Member/index'
import ListResto from '@/components/Member/listresto'
import SearchResto from '@/components/Member/searchResto'
import RestoDetail from '@/components/Member/restoDetail'
import RestoReserve from '@/components/Member/restoReserve'
import MyFavorite from '@/components/Member/myFavorite'
import Bill from '@/components/Member/bill'
// Admin Resto
import AdminResto from '@/components/AdminResto/index'
import MenuAR from '@/components/AdminResto/menu'
import restoSetup from '@/components/AdminResto/restoSetup'
import confirmList from '@/components/AdminResto/confirmList'
import ReservationList from '@/components/AdminResto/reservationlist'
// System Admin
import SystemAdmin from '@/components/SystemAdmin/index'
import reqAdminSA from '@/components/SystemAdmin/reqAdmin'
import AccountSA from '@/components/SystemAdmin/account'
import ReviewSA from '@/components/SystemAdmin/review'
import Algo from '@/components/SystemAdmin/algo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      meta: { checksAuth: true },
      component: Member,
      children: [
        {
          path: '/',
          name: 'Home',
          component: ListResto
        },
        {
          path: '/search/:type/:search',
          name: 'SearchResto',
          component: SearchResto
        },
        {
          path: '/profile/:id',
          name: 'memberProfile',
          component: profilePage
        },
        {
          path: '/history/:id',
          name: 'memberHistory',
          component: historyPage
        },
        {
          path: '/resto/:id',
          name: 'restoDetail',
          component: RestoDetail
        },
        {
          path: '/changepass',
          name: 'ChangePassword',
          component: ChangePassword
        },
        {
          path: '/myFavorite',
          name: 'MyFavorite',
          component: MyFavorite
        },
        {
          path: '/bill/:id',
          name: 'Bill',
          component: Bill
        },
        {
          path: '/reserve/:id',
          name: 'Reserve',
          component: RestoReserve
        }]
    },
    {
      path: '/login',
      name: 'Login',
      meta: { checksAuth: true },
      component: loginPage
    },
    {
      path: '/signup',
      name: 'Signup',
      meta: { checksAuth: true },
      component: signUp
    },
    // Admin Resto
    {
      path: '/mainAR',
      meta: { requireAR: true },
      component: AdminResto,
      children: [
        {
          path: '/',
          name: 'AdminResto',
          component: MenuAR
        },
        {
          path: '/profileAR/:id',
          name: 'ARProfile',
          component: profilePage
        },
        {
          path: '/changepassAR',
          name: 'ChangePasswordAR',
          component: ChangePassword
        },
        {
          path: '/confirmList/:id',
          name: 'confirmList',
          component: confirmList
        },
        {
          path: '/ReservationList/:id',
          name: 'ReservationList',
          component: ReservationList
        },
        {
          path: '/restoSetup/:id',
          name: 'restoSetup',
          component: restoSetup
        }]
    },
    // System Admin
    {
      path: '/mainSA',
      meta: { requireSA: true },
      component: SystemAdmin,
      children: [
        {
          path: '/',
          name: 'ReqAdmin',
          component: reqAdminSA
        },
        {
          path: '/Account',
          name: 'AccountM',
          component: AccountSA
        },
        {
          path: '/Resto',
          name: 'Reviews',
          component: ReviewSA
        },
        {
          path: '/Algo',
          name: 'Algo',
          component: Algo
        }
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFoundPage
    }
  ]
})
