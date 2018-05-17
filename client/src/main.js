// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import DateTimePicker from '@/components/helper/DateTimePicker.vue'
import NumberTextField from '@/components/helper/numberTextField.vue'

Vue.use(Vuetify)
Vue.component('DateTimePicker', DateTimePicker)
Vue.component('NumberTextField', NumberTextField)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    checkAuth(to, from, next, true)
  }
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters.getUser.role === 'admin') {
      next()
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  }
  if (to.matched.some(record => record.meta.checksAuth)) {
    checkAuth(to, from, next, false)
  }
  next()
})
function checkAuth (to, from, next, type) {
  const token = 'bearer ' + localStorage.getItem('authToken')
  axios.get(`${store.getters.ROOT_URL}/checkAuth`, {headers: {'Authorization': token}})
    .then(res => {
      store.dispatch('setUser', res.data.user)
      if (type) {
        next()
      } else {
        next({
          path: '/main',
          query: { redirect: to.fullPath }
        })
      }
    }).catch(() => {
      if (type) {
        store.dispatch('setErrorMsg', {codeS: 999, type: 'error'})
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
