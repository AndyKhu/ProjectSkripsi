// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//  Vue Material Component Framework
import Vuetify from 'vuetify'
import 'element-ui/lib/theme-chalk/index.css'

import auth from './router/auth'
import('../node_modules/vuetify/dist/vuetify.min.css')
auth.checkAuth()

Vue.use(Vuetify)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.user.authenticated) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (auth.user.role === 'admin') {
      next()
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  }
  if (to.matched.some(record => record.meta.checksAuth)) {
    if (auth.user.authenticated) {
      next({
        path: '/main',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
